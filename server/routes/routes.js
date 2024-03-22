const express = require("express");
const router = express.Router();
router.use(express.json());
const connectToDB = require("../utils/database");
const User = require("../models/UserModel");
const UserCredentials = require("../models/UserCredentials");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("./authenticateMiddleware");
const sendMail = require("./mailsender");
const ErrorCodes = require("../constants");
const cookieParser = require("cookie-parser");
const { randomUUID } = require("crypto");

router.use(cookieParser());

router.get("/users", async(req, res) => {
  try {
    await connectToDB();
    const users=await User.find({});
    res.status(200).json({
      users,
      noOfUser:users.length
    })
    
  } catch (error) {
    res.status(200).json({
      error:{
        errorMessage:"",
      }
    })
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("body",username,email,password)
  try {
    const websocketId=randomUUID()
    await connectToDB();
    const doesUserExists=await User.exists({email})
    console.log("does user exists",doesUserExists)
    if(doesUserExists!==null){
      res.status(403);
    res.json({
      error: {
        errorMessage: "User already exists",
        errorCOde:ErrorCodes.USER_EXISTS
      }
    });
    return;
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.ceil(Math.random() * 1000000);
    const hashedCode = await bcrypt.hash(verificationCode.toString(), 10);

    await sendMail({
      to: email,
      subject: "verification",
      text: verificationCode.toString(),
    });
    const newUser = await User.create({
      username,
      email,
      websocketId
    });
    const newUserCredentials = await UserCredentials.create({
      email,
      password: hashedPassword,
      user: newUser._id,
      code: hashedCode,
    });
    res.send(JSON.stringify(newUser));
    return ;
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      error: {
        errorMessage: error.message || "something wrong happened",
      },
      
    });
    return;
  }
});

router.post("/login", async (req, res) => {
  try {
    await connectToDB();
    const { email, password } = req.body;
    const userDetail = await UserCredentials.findOne({ email }).populate("user");
    if (!userDetail) {
      throw new Error("User doesn't exists");
    }
    const userVerifiedDate = await userDetail.verifiedAt;
    if (!userVerifiedDate) {
      res.status(401).json({
        error: {
          errorMessage: "User not Verified",
          errorCode: ErrorCodes.EMAIL_NOT_VERIFIED,
        },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetail.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "86400",
      });
      res.status(200);
      res.cookie("accessToken",token,{maxAge:86400})
      res.json({
        accessToken: token,
        email:userDetail.user.email,
        username:userDetail.user.username,
        userID:userDetail._id,
        websockedId:userDetail.user.websockedId
      });
      return;
    } else {
      throw new Error("password doesn't match");
      return;
    }
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message || "something wrong happened",
      },
    });
    return;
  }
});

router.get("/test", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const UserDetails = await UserCredentials.findOne({
      email: "shanticpgn@gmail.com",
    }).populate("userid");
    res.send(UserDetails);
  } catch (error) {
    res.send("unsuccess");
  }
});

router.post("/verifyemail", async (req, res) => {
  const verificationCode = req.body.code;
  const email = req.body.email;
  try {
    await connectToDB();
    const credentials = await UserCredentials.findOne({ email });
    const isCorrectCode = await bcrypt.compare(
      verificationCode.toString(),
      credentials.code
    );
    if (!isCorrectCode) {
      res.status(401).json({
        error: {
          message: "Wrong verifcation code",
        },
      });
    } else {
      await UserCredentials.findByIdAndUpdate(credentials._id, {
        verifiedAt: new Date(),
      });
      res.status(200).json({ message: "Email successfully verified" });
    }
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "something wrong happened",
      },
    });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    await connectToDB();
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).json({
        error: {
          errorMessage: "User not found",
          errorCode: ErrorCodes.USER_NOT_FOUND,
        },
      });
    }
    const code = Math.ceil(Math.random() * 1000000);
    const encryptedCode = await bcrypt.hash(code.toString(), 10);
    await sendMail({
      to: email,
      text: code.toString(),
      subject: "verification code",
    });
    await UserCredentials.findOneAndUpdate({ email }, { code: encryptedCode });
    res.status(200).json({ message: "verification code sent successfully" });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Something wrong happened",
      },
    });
  }
});

router.post("/verifyCode", async (req, res) => {
  const { email, code } = req.body;
  try {
    await connectToDB();
    const userCredentials = await UserCredentials.findOne({ email });
    const isCodeCorrect = await bcrypt.compare(
      code.toString(),
      userCredentials.code
    );
    console.log(isCodeCorrect);
    if (!isCodeCorrect) {
      res.status(401).json({
        error: {
          errorMessage: "Wrong verification code",
          errorCode: ErrorCodes.WRONG_CODE,
        },
      });
    }
    const newVerificationCodeForChangingPassword = Math.ceil(
      Math.random() * 1000000
    );
    const encryptedCode = await bcrypt.hash(
      newVerificationCodeForChangingPassword.toString(),
      10
    );
    await UserCredentials.findByIdAndUpdate(userCredentials._id, {
      code: encryptedCode,
    });
    res
      .status(200)
      .cookie(
        "changePasswordCode",
        newVerificationCodeForChangingPassword.toString(),
        { maxAge: 60 * 60 }
      )
      .json({ message: "Verification successfull" });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Something wrong happened",
      },
    });
  }
});

router.post("/changePassword", async (req, res) => {
  const changePasswordCode = req.cookies.changepasswordcode;
  const { email, password } = req.body;
  try {
    await connectToDB();
    const credentials = await UserCredentials.findOne({ email });
    const isCorrectCode = await bcrypt.compare(
      changePasswordCode.toString(),
      credentials.code
    );
    if (!isCorrectCode) {
      res.status(201).json({
        error: {
          errorMessage: "sorry authentication failed",
          errorCode: ErrorCodes.WRONG_CODE,
        },
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedUserCredentials = await UserCredentials.findOneAndUpdate(
      { email },
      { password: encryptedPassword }
    );
    res.status(200).json({
      message: "password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Something wrong happened",
      },
    });
  }
});

router.get("/");
module.exports = router;
