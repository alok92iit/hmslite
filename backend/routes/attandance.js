const express = require("express");
const { markAttandance, matrix } = require("../controllers/attandance.controller");

const attandance =express.Router()

attandance.route("/matrix")
        .get(matrix)

attandance.route("/")
        .patch(markAttandance)


module.exports ={attandance}