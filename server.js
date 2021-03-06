const express = require('express')
const mongoose = require('mongoose')
const  PORT = process.env.PORT|| 5000
const cors = require('cors')
const morgan = require('morgan')
const app = express()



// all router 

const userRouter= require('./router/userRouter')
const clientRouter = require('./router/clientRouter')
const employeeRouter = require('./router/employeeRouter')
const shiftRouter= require('./router/shiftRouter')




// database connection 
mongoose.connect('mongodb://localhost/Hr_company_database' , {useUnifiedTopology:true, useNewUrlParser:true}, err=>{
    if(err){
        return  console.log('Database connection failed')
    }
    console.log( "Database connection successfull !")
})








// user middlaware , route , etc
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(userRouter)
app.use(clientRouter)
app.use(employeeRouter)
app.use(shiftRouter)









app.listen(PORT , ()=>{
    console.log('Server started on port no : ' , PORT)
})