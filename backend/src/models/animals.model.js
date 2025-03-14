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
        type:String
    },
    breed:{
        type:String
    },
    gender:{
        type:string
    },
    description:{
        type:string
    },
    uplodedBy:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    adoptionStatus:{
        type:string,
        enum:['Available' ,'Adopted ','Fostered'],
        default:['Available']
    }
    
} ,{timestamps:true})

export const Animal= mongoose.model('Animal' ,animalSchema)