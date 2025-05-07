import Emergency from '../models/emergency.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const raiseEmergency = async (req, res) => {
  try {
    const imagePaths = req.files?.emergencyImages?.map(file => file.path) || [];

    if (imagePaths.length === 0) {
      return res.status(400).json({ message: "Emergency images are required" });
    }

    // ⬇️ Upload and keep the full image object
    const emergencyImages = await Promise.all(
      imagePaths.map(async (imagePath) => {
        const uploadedImage = await uploadOnCloudinary(imagePath); // returns { url, public_id, ... }
        return uploadedImage;
      })
    );

    const emergency = new Emergency({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      emergencyImages,
      priority: req.body.priority,
      raisedBy: req.user._id,
    });

    await emergency.save();
    res.status(201).json({ message: "Emergency reported successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to raise emergency", error: err.message });
  }
};


// Create an emergency
export const createEmergency = async (req, res) => {
  try {
    const newEmergency = new Emergency(req.body);
    await newEmergency.save();
    res.status(201).json({ message: 'Emergency created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create emergency', error });
  }
};

// Get all emergencies
export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find(); // Fetching all emergency data from the database
    res.status(200).json(emergencies);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch emergencies', error });
  }
};

