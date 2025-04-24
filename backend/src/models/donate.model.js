import mongoose from "mongoose";

const donateSchema =new mongoose.Schema({
    donationBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    donationType:{
        
    }
} ,{timestamps:true})

export const Donate =mongoose.model('Donate',donateSchema)