import mongoose, { Schema } from "mongoose"

const fotserhomeSchema =mongoose.Schema({
    HomeName:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    Contact:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Avatar:{
        type:String,
        require:true
    },
    Image:{
        type:[String]
        
    },
    Description:{
        type:String
    },
    Admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const FosterHome = mongoose.model('FosterHome' ,fotserhomeSchema)