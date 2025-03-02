import { asyncHandler } from "../utils/asyncHandler.js";  // ✅ Correct
//import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";
import jwt from "jsonwebtoken";





//registering user

const registerUser=asyncHandler(async (req ,res)=>{
   res.status(200).json({                   //res.status(200).json({...}) is an Express.js response method used to send a JSON response with an HTTP status code.
        message:"ok"
    })

    const {fullname ,email ,username ,password}=req.body
    console.log("fullname:" ,fullname);

    /*if (fullname==="") {
        throw new ApiError(400 ,"fullname is required")
    } else {
        
    }*/


    //to check if all fields inputted or not

    if (
        [fullname ,email,username ,password]
        .some((field)=>field?.trim()==="")                      //.some() method loops through the array [fullname, email, username, password] and assigns each value to field one by one.
    ) {                                                        //then if field h toh spaces trim krdo and if nhi toh error throw
        throw new ApiError(400,"all fields are required");
    }
})

export {registerUser}