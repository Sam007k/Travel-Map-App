const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MONGODB_Connected')
}).catch((err)=> console.log(err))

app.listen(8000,()=>{
    console.log('Backend server is running!')
})