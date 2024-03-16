
const jwt=require("jsonwebtoken")

function authenticate(req,res,next){
const token=req.headers["authorization"].split(" ")[1]
if(!token){
	res.status(401).json({error:"access denied"})
}
try{
	const isCorrect=jwt.verify(token,process.env.JWT_SECRET);
	req.body.email=isCorrect.email;
	next();
}
catch (error){
	res.status(401).json({error:{
		errormessage:"access denied"
	}})
}
}

module.exports=authenticate;