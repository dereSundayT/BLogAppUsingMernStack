//bring in express
const express = require('express');
const connectDB = require('./config/db');

//initialize app variable
const app = express();

//::Connect Database
connectDB();
//init MiddleWare
// BodyParser:gives us room to have access to our form data
app.use(express.json({extended:false}));
//Test
app.get('/',(req,res)=> res.send('Api Is Running'))
//bringing in our routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/posts', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}` ));