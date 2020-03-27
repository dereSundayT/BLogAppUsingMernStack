//::1
const mongoose = require('mongoose');
//::2
//bring in the config package
const config = require('config');
const db = config.get('mongoURI');
//::3
const connectDB = async () => {
    try {
        await mongoose.connect(db,
            { 
                useNewUrlParser:true,
                useUnifiedTopology: true,
                useCreateIndex:true
            }
            );
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        //Exit Process With Failure
        process.exit(1);  
    }
}
//::4
module.exports = connectDB;