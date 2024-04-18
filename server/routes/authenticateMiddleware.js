const jwt=require("jsonwebtoken")

function authenticate(req,res,next){
const token=req.headers["authorization"].split(" ")[1]
console.log("token is",token)
if(!token){
	res.status(401).json({error:"access denied"})
}
try{
	console.log("token",token)
	const isCorrect=jwt.verify(token,process.env.JWT_SECRET);
	console.log("iscorrect",isCorrect)
	req.body.userID=isCorrect.userID;
	next();
}
catch (error){
	console.log("error is",error)
	res.status(401).json({error:{
		errormessage:error
	}})
}
}

module.exports=authenticate;