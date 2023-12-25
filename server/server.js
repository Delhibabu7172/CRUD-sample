const express=require("express")
const mongoose = require('mongoose');
const cors = require('cors');

const port=3001

const app=express()
app.use(cors())
app.use(express.json())

// this for mongodb connection from database
mongoose.connect("mongodb://127.0.0.1:27017/customer-data")

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    phnum:String
},{versionKey:false})

const usermodel=mongoose.model("users",userSchema)

app.post("/add",(req,res)=>{
usermodel.create(req.body)
.then(users=>res.json(users))
.catch(err=>res.json(err))
})

// this is for to show in admin page if we added
app.get("/",(req,res)=>{
    usermodel.find({})
    .then(result => res.json(result))
    .catch(err =>res.json(err))
})

//update 
app.get("/getuser/:id",(req,res)=>{
    const id=req.params.id;
    usermodel.findById({_id:id})
    .then(result => res.json(result))
    .catch(err =>res.json(err))
})

//update to back in list
app.put("/update/:id",(req,res)=>{
    const id=req.params.id;
    usermodel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        phnum:req.body.phnum
    })
    .then(result => res.json(result))
    .catch(err =>res.json(err))
})

//for delete
app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    usermodel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err =>res.json(err))
})

app.listen(port,()=>{
    console.log(`server is runing on ${port} `)
})