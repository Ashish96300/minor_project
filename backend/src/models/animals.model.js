import mongoose from "mongoose";



const animalSchema =new mongoose.Schema({
   
    image:{
        type:String,
        required:true
    },
    age:{
        type:String,
        
    },
    species:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        
    },
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    uploadedBy:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    adoptionStatus:{
        type:String,
        enum:['Available' ,'Adopted ','Fostered'],
        default:'Available'
    },
    location:{
        type:String,
        required:true
    }
    
    
} ,{timestamps:true})

export const Animal= mongoose.model('Animal' ,animalSchema)