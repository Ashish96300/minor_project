import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Animal } from "../models/animals.model.js";

const animalRegister = asyncHandler(async (req, res) => {
    const { animalId, age, species, breed, gender, description, adoptionStatus } = req.body;

    // Get user ID from authenticated request
    const uploadedBy = req.user.id;  // Ensure `req.user` is set via authentication middleware

    // Validate required fields
    if ([animalId, age, species, breed, gender, description, adoptionStatus].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if animal is already registered
    const ifRegistered = await Animal.findById(animalId);
    if (ifRegistered) {
        throw new ApiError(400, "Animal already registered");
    }

    // Handle image upload
    const imageLocalPath = req.file?.path;  // Adjust based on how the file is uploaded
    if (!imageLocalPath) {
        throw new ApiError(400, "Cover image is required");
    }

    const aniImg = await uploadOnCloudinary(imageLocalPath);
    if (!aniImg?.url) {
        throw new ApiError(400, "Cover image upload failed");
    }

    // Create new animal entry
    const animal = await Animal.create({
        animalId,
        age,
        image: aniImg.url,
        species,
        breed,
        gender,
        description,
        uploadedBy,  // Save user ID here
        adoptionStatus,
    });

    if (!animal) {
        throw new ApiError(500, "Something went wrong while registering the animal");
    }

    return res.status(201).json(new ApiResponse(201, animal, "Animal registered successfully"));
});

export { animalRegister };
