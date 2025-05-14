import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: {
    type: String,
    required: true,
  },
  emergencyImages:{
    type: [String], 
    required: true,
  
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  raisedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Emergency", emergencySchema);
