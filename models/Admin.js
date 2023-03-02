const mongoose  = require("mongoose");
const { Schema } = mongoose

const AdminSchema = new Schema({

    adminid:{
        // type:String,
        required:true,
        type:Number,
        unique:true
    },
    a_name :{
        type: String,
        required:true,
        unique:true
    },
    f_name :{
        type: String,
        required:true
    },
    password :{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    cnic:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type: String,
        required:true
    },
    date:{ 
        type: Date, 
        default: Date.now 
    },
})

const Admin = mongoose.model('admin' , AdminSchema)
// const AdminCounter = mongoose.model('admincounter' , AdminCounterSchema)
Admin.createIndexes();
module.exports = Admin;
// module.exports = AdminCounter
