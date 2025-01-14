const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db');
const router = require('./routes/index');


const PORT = process.env.PORT || 4000;


const app = express()
app.use(cors({
    origin: ["https://asifecommerceaz-client.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());

app.use('/api', router);

app.get("/", (req, res)=>{
    res.json("Welcome to my website")
})






connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})