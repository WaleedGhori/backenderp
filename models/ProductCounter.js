const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductCounterSchema = new Schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});
const ProductCounter = mongoose.model("productcounter", ProductCounterSchema);
module.exports = ProductCounter;
