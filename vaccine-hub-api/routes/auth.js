const express = require("express")


const User = require("../models/users")


const auth = express.Router()

const { BadRequestError, NotFoundError } = require("../utils/errors");




auth.post("/register" , async (req, res, next) => {

    try{

        const user = await User.register(req.body)

        return res.status(200).json({user})
        
    }

    catch(error){

        next(error)
    }


})



auth.post("/login", async(req, res, next) => {


    try{


        const user = await User.login(req.body)

        return res.status(200).json({user})


        
    }

    catch(error){

        next(error)
    }



})





module.exports = auth