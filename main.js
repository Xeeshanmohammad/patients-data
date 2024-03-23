const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require("cors")
// Database connection
const connectDB = require("./services/ConnectDB")

//router functionality
const patientRouter = require('./routers/patientRouter')

// Error-handling ==== Middleware
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/errorHandle')

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("tiny"))
app.use('/api/v1/patients',patientRouter)


app.get('/', (req,res)=>{
    res.send("<h2>Mind Blowing Tasks<h2/>")
})

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5252

const start = async()=>{
    try {
        await connectDB()
      await  app.listen(port,()=>{
            console.log(`Server is listening on : ${port}`);
            console.log(`Nodejs Version : 16.4.3`);
        })
    } catch (error) {
        console.log("oops! server error");
    }
}

start()