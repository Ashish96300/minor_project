import mongoose from "mongoose";


const hospitalSchema=new mongoose.Schema({
    hospitalName :{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    helpLineNumber:{
         type: String,
         required: true,
         unique: true,
         trim: true, 
    },
    address:{
        type: String,
        required: true,
        },
    avatarH: {
        type: String, // cloudinary url
        required: true,
    }
},{timestamps:true})


export const Hospital =mongoose.model("Hospital" ,hospitalSchema)