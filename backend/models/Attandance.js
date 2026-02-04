const mongoose = require("mongoose");


const AttandanceSchema = new mongoose.Schema({

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees"
  },
  status:{
    type:Number,
    enum:[1,0]
  },
  remark:{
    type:String,
    default:null
  },
  createdAt:Number,
  attandanceOn:Number
});

const Attandance=mongoose.model("Attandance", AttandanceSchema);
module.exports = {Attandance}
