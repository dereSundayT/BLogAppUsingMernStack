//bring in express
const express = require('express');
//initialize app variable
const app = express();

//Test
app.get('/',(req,res)=> res.send('Api Is Running'))

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}` ));