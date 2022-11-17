const mongoose  = require("mongoose");
const { Schema } = mongoose

const CustomerCounterSchema = new Schema({

    id:{
        type:String,
    
    },
    seq :{
        type: Number,
    },

})
const CustomerCounter = mongoose.model('customercounter' , CustomerCounterSchema)
module.exports = CustomerCounter