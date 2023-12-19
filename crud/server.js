const express = require('express')
const app = express()
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())

const userRoute =require('./Api/Routers/user');

const conn = require('./Api/Routers/database_connection');

app.use('/user',userRoute)// jabhi koi /register hit karega wo jayega registerrouterme




app.use((req,res,next)=>{
 // agar isse koi call karega liya kiya return karega 200 status means ok
  res.status(404).json({
    message:'URL NOT BAD REQUEST'
  })//koi /staff url nhi hota uska msg print kra denge
})

const port = 8000;  // Setting an port for this application 
  
  
// Starting server using listen function 
app.listen(port, function (err) { 
   if(err){ 
       console.log("Error while starting server"); 
   } 
   else{ 
       console.log("Server has been started at "+port); 
   } 
}) 



