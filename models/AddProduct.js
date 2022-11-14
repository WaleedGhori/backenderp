const mongoose  = require("mongoose");
const { Schema } = mongoose;

const AddProductSchema = new Schema({
    p_Id:{
        type:String,
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
        type: String,
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

const AddProd = mongoose.model('addprod' , AddProductSchema)
AddProd.createIndexes();
module.exports = AddProd;
