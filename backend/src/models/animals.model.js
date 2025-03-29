import mongoose from "mongoose";

const animalSchema =new mongoose.Schema({
   
    image:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    species:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uploadedBy:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    adoptionStatus:{
        type:String,
        enum:['Available' ,'Adopted ','Fostered'],
        default:'Available'
    }
    
} ,{timestamps:true})

export const Animal= mongoose.model('Animal' ,animalSchema)