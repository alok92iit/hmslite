const express = require("express");
const { allEmployee, addEmployee, deleteEmpoyee, updateEmployee } = require("../controllers/employee");
const employee=express.Router()


employee.route("/")
    .get(allEmployee)
    .post(addEmployee)

employee.route("/:id")
    .delete(deleteEmpoyee)
    .patch(updateEmployee)

module.exports=employee