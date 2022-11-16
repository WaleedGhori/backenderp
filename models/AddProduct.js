const mongoose  = require("mongoose");
const { Schema } = mongoose;

const AddProductSchema = new Schema({
    p_Id:{
        type:Number,
        required:true,
        unique:true
    },
    p_name :{
        type: String,
        required:true
    },
    p_category :{
        type: String,
        required:true
    },
    p_company:{
        type: String,
        required:true
    },
    p_quantity:{
        type: String,
        required:true
    },
    p_price:{
        type: Number,
        required:true
    },
    P_sale:{
        type:Number
    },
    p_exsale:{
        type:Number
    },
    date:{ 
        type: Date, 
        default: Date.now 
    },
})

const AddProduct = mongoose.model('addprod' , AddProductSchema)
AddProduct.createIndexes();
module.exports = AddProduct;
