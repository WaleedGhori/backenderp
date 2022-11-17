
const mongoose  = require("mongoose");
const { Schema } = mongoose

const CustomerSchema = new Schema({

    c_Id:{
        // type:String,
        // unique:true
        required:true,
        type:Number,
        unique:true
    },
    cus_name :{
        type: String,
        required:true
    },
    p_name:{
        type: String,
        required:true
    },
    pro_quantity:{
        type: Number,
        required:true
    },
    t_ammount:{
        type: Number,
    },
    a_recived:{
        type: Number,
        required:true
    },
    bal_ammount:{
        type: Number,
    },
    discount:{
        type: Number,
    },
    date:{ 
        type: Date, 
        default: Date.now 
    },
})
const Customer = mongoose.model('customer' , CustomerSchema)
// const AdminCounter = mongoose.model('admincounter' , AdminCounterSchema)
Customer.createIndexes();
module.exports  = Customer;
// module.exports = AdminCounter
