const mongoose  = require("mongoose");
// const mongooseURI  = 'mongodb://localhost:27017/wakerp'
// const mongooseURI  = "mongodb://localhost:27017"
const mongooseURI  = "mongodb+srv://admin:adminwaleed@cluster0.uu5arje.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo = () =>{
    mongoose.connect(mongooseURI , ()=>{
        console.log("Connected to mongoo successfully");
    });
}
module.exports = connectToMongo