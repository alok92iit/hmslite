const express = require("express");
const { allDepartment, addDepartment } = require("../controllers/department.controller");
const department =express.Router()


department.route("/")
        .get(allDepartment)
        .post(addDepartment)


module.exports=department