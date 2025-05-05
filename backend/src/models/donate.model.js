// 

import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donationItem: {
      type: String,
      required: true,
    },
    donationType: {
      type: String,
      required: true,
      enum: ['Food', 'Medical', 'Essential'],
    },
    donatedTo: {
      type: String,
      required: true,
      enum: ['Hospital', 'FosterHome'],
    },
    donatedToName: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    message: {
      type: String,
      default: '',
    },
    files: [
      {
        type: String, // Store image URLs or file paths
      },
    ],
    donationStatus: {
      type: String,
      default: 'Pending', // You can track status: Pending, Approved, Rejected
      enum: ['Pending', 'Approved', 'Rejected'],
    },
  },
  { timestamps: true } // To track created and updated times
);

// Create a model based on the schema
const Donate = mongoose.model('Donation', donationSchema);

export { Donate};
