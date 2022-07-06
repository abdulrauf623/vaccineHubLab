const express = require("express")


const auth = express.Router()

const { BadRequestError, NotFoundError } = require("../utils/errors");




auth.post("/register" , async (req, res, next) => {


})



auth.post("/login", async(req, res, next) => {


})





module.exports = auth