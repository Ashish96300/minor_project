import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Animal } from "../models/animals.model.js";

import { User } from "../models/user.model.js";

const animalRegister = asyncHandler(async (req, res) => {
    const { animalId, age, species, breed, gender, description, adoptionStatus ,location } = req.body;

   // console.log("req.user =", req.user);
    
    const uploadedBy = req.user?._id;

    if (!uploadedBy) {
    throw new ApiError(401, "User authentication failed");
}

    // Validate required fields
    if ([animalId, age, species, breed, gender, description, adoptionStatus ,location].some((field) => field?.trim()==="")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if animal is already registered
    const ifRegistered = await Animal.findById(animalId);
    if (ifRegistered) {
        throw new ApiError(400, "Animal already registered");
    }
    //const uploadedBy= await User.find().populate("username" ,"fullName")
   


    // Handle image upload
    const imageLocalPath = req.file?.path;  
    //console.log("Uploaded File Path:", req.file?.path);

    if (!imageLocalPath) {
        throw new ApiError(400, "Cover image is required");
    }

    const aniImg = await uploadOnCloudinary(imageLocalPath);
    console.log(aniImg.url)

    if (!aniImg?.url) {
        throw new ApiError(400, "Cover image upload failed");
    }
   
   
    // Create neww animal entry
    const animal = await Animal.create({
        animalId,
        age,
        image: aniImg.url,
        species,
        breed,
        gender,
        description,
        uploadedBy,  
        adoptionStatus,
        location
    });
    const populatedAnimal = await Animal.findById(animal._id).populate("uploadedBy", "username email");

    if (!populatedAnimal) {
        throw new ApiError(500, "Something went wrong while registering the animal");
    }
    
    // Send response with the populated animal data
    return res.status(201).json(new ApiResponse(201, populatedAnimal, "Animal registered successfully"));
});

const getAllAnimal = async (req, res) => {
    try {
        const animals = await Animal.find().populate("uploadedBy", "username email");

        if (animals.length === 0) {
            return res.status(400).json({ message: 'No animal details found' });
        }

        return res.status(200).json({ animals: animals });
    } catch (error) {
        console.error('Error fetching animals:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export { animalRegister ,getAllAnimal};
