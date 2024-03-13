
const http=require("http");
const port=3000;
const hostname="localhost"
const express=require("express")
const app=express()
const routes=require("./routes/routes")

app.use("/api",routes)
app.use(express.json())

app.listen(port,()=>{
console.log(`server started at http://${hostname}:${port}`)
})

app.get("/users",(req,res)=>{
	return 
})
