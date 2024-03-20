
const http=require("http");
const port=3100;
const hostname="localhost"
const express=require("express")
const app=express()
const routes=require("./routes/routes")
const cors=require("cors")
app.use(cors(
))
app.use("/api",routes)
app.use(express.json())


app.listen(port,(req,res)=>{
console.log(`server started at http://${hostname}:${port}`)
})

