const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,   // creates index in DB
    lowercase: true,
    trim: true
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },

  employeeId: {
    type: String,
    unique: true,
    required: true
  },

  createdAt: {
    type: Number,
    required: true,
    default: () => Date.now()
  }
});
module.exports = mongoose.model("Employee", employeeSchema);
