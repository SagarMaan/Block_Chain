const express = require('express')
const mongoose = require('mongoose')
const app = express()
const route = require('./routes/route')

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

mongoose.set('strictQuery',true)
mongoose.connect("mongodb+srv://SagarMaan:yHJBlRWQ0FdJmdj6@chaudhary-shaab-db.cueddss.mongodb.net/Block-Chain",
{useNewUrlParser :true})
.then(()=>{
    console.log("MongoDB is connected.")})
.catch((error)=>{
    console.log(error.msg)
})

app.use('/',route)

app.listen(process.env.port||3000 , (()=>{
    console.log(`Server is running on ${process.env.port||3000 }`)
}))