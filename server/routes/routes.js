const express = require("express");
const router = express.Router();
router.use(express.json());
const connectToDB = require("../utils/database");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const authenticate = require("./authenticateMiddleware");

router.get("/users", (req, res) => {
  res.send(JSON.stringify({ users: "hello" }));
});

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await connectToDB();
    await bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        throw new Error(err);
      }
      const newUser = await User.create({
        username: fullName,
        email,
        password: hashedPassword,
      });
      res.send(JSON.stringify(newUser));
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message || "something wrong happened",
      },
    });
  }
});

router.post("/login",async(req,res)=>{
	const {email,password}=req.body;
	try {
		await connectToDB();
		const userDetail=await User.findOne({email});
		if(!userDetail){
			throw new Error("User doesn't exists")
		}
		const isPasswordCorrect=await bcrypt.compare(password,userDetail.password)
		if(isPasswordCorrect){
			const token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:"100s"});
			res.status(200);
			res.json({
				accessToken:token
			})
		}
		else{
			throw new Error("password doesn't match")
		}
	} catch (error) {
		res.status(error.status || 500);
    res.json({
      error: {
        message: error.message || "something wrong happened",
      },
    });
	}
})

router.get("/test",authenticate,async(req,res)=>{
try {
	res.send(req.body.email)
} catch (error) {
	res.send("unsuccess")
}
});
module.exports = router;
