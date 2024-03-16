
const http=require("http");
const port=3000;
const hostname="localhost"
const express=require("express")
const app=express()
const routes=require("./routes/routes")
const cors=require("cors")
app.use(cors(
	{origin:"http://localhost:5173",optionsSuccessStatus: 200,}
))
app.use("/api",routes)
app.use(express.json())


app.listen(port,()=>{
console.log(`server started at http://${hostname}:${port}`)
})

app.get("/users",(req,res)=>{
	return 
})
