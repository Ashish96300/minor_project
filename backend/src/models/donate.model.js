import mongoose from "mongoose";

const donateSchema =new mongoose.Schema({
    donationBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    donationType:{
        type:String,
        required:true
    },
    donationItem:{
        type:String,
        required:true
    },
    donationItemImage:{
        type:[String],
        required:true
    },
    donatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'donatedToModel'
      },
      donatedToModel: {
        type: String,
        required: true,
        enum: ['Hospital', 'FosterHome']
      },
      message:{
        type:String,
        
      },
    //   senderName:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //   },
    //   senderEmail:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //   },
} ,{timestamps:true})

export const Donate =mongoose.model('Donate',donateSchema)