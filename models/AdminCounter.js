const mongoose  = require("mongoose");
const { Schema } = mongoose

const AdminCounterSchema = new Schema({

    id:{
        type:String,
    
    },
    seq :{
        type: Number,
    },

})
const AdminCounter = mongoose.model('admincounter' , AdminCounterSchema)
module.exports = AdminCounter