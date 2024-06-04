const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const authRoutes = require("./Routes/authRoutes")
const  connectDB  = require('./config/db')
const cors = require('cors')

//configure env
dotenv.config()

//rest object
const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}));

// routes
app.use('/api/v1/auth', authRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})