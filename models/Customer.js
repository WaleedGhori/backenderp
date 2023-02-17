
const mongoose = require("mongoose");
const { Schema } = mongoose

const CustomerSchema = new Schema({

    c_Id: {
        // type:String,
        // unique:true
        required: true,
        type: Number,
        unique: true
    },
    cus_name: {
        type: String,
        required: true
    },
    products: [
        {
            P_sale:{type:Number},
            p_company:{type:String},
            p_name:{type:String},
            p_exsale:{type:Number},
            p_price:{type:Number},
            p_quantity:{type:Number},
            cus_name:{type:String},
            p_Id:{type:String},
            pro_quantity:{type:String}
        }
    ],
    subtotal: {
        type: Number,
        required: true
    }, 
    totalquant: {
        type: Number,
        required: true
    },
    finalpay: {
        type: Number,
        required: true
    },
    ammountpay: {
        type: Number,
        required: true
    },
    balanceammount: {
        type: Number,
    },
    totalsale: {
        type: Number,
    },
    totalexsale: {
        type: Number,
    },
    returnammount: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const Customer = mongoose.model('customer', CustomerSchema)
// const AdminCounter = mongoose.model('admincounter' , AdminCounterSchema)
Customer.createIndexes();
module.exports = Customer;
// module.exports = AdminCounter
