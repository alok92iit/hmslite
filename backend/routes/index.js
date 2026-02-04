const express = require("express");
const employee = require("./employee");
const department = require("./department");
const { attandance } = require("./attandance");

const routes = express.Router();

routes.use("/employee",employee)
routes.use("/department",department)
routes.use("/attandance",attandance)


module.exports=routes