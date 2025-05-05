import { Donate } from "../models/donate.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// const donatingItem = asyncHandler(async (req, res) => {
//     const { donationItem, donationType } = req.body;
//     const donationBy = req.user._id;

//     const donationItemImageLocalPath = req.files?.map(file => file.path) || [];

//     if (donationItemImageLocalPath.length === 0) {
//         throw new ApiError(400, "Donation item image is required");
//     }

//     const donationItemImage = await Promise.all(
//         donationItemImageLocalPath.map(uploadOnCloudinary)
//     );

//     if (!donationItemImage || donationItemImage.length === 0) {
//         throw new ApiError(400, "Failed to upload donation item image");
//     }

//     const donate = await Donate.create({
//         donationItem,
//         donationType,
//         donationItemImage: donationItemImage.map(img => img.url),
//         donationBy
//     });

//     const populatedDonation = await Donate.findById(donate._id).populate(
//         'donationBy',
//         'username email'
//     );

//     return res.status(200).json(new ApiResponse(200, populatedDonation, "Donation Successful"));
// });

// 

// import { Donate } from '../models/donate.model';  // Import your donation model
// import { ApiError } from '../utils/ApiError';      // Import your custom error handler
// import { asyncHandler } from '../utils/asyncHandler'; // Import asyncHandler
// import { uploadOnCloudinary } from '../utils/cloudinary'; // Assuming you have cloudinary upload logic

const donatingItem = asyncHandler(async (req, res) => {
  const { donationItem, donationType, donatedToModel, donatedToName, message, senderName, senderEmail } = req.body;
  const donationBy = req.user._id;

  // Step 1: Validate donatedToModel
  if (!['Hospital', 'FosterHome'].includes(donatedToModel)) {
    throw new ApiError(400, "Invalid donatedToModel. Must be 'Hospital' or 'FosterHome'");
  }

  // Step 2: Find the target Hospital or FosterHome by name
  const Model = donatedToModel === 'Hospital' ? Hospital : FosterHome;

  const donatedToDoc = await Model.findOne({
    $or: [
      { name: donatedToName },
      { hospitalName: donatedToName },
      { HomeName: donatedToName }
    ]
  });

  if (!donatedToDoc) {
    throw new ApiError(404, `${donatedToModel} with name '${donatedToName}' not found`);
  }

  const donatedTo = donatedToDoc._id;

  // Step 3: Handle image upload (multiple images for the donation item)
  const donationItemImageLocalPath = req.files?.map(file => file.path) || [];

  if (donationItemImageLocalPath.length === 0) {
    throw new ApiError(400, "Donation item image is required");
  }

  const donationItemImage = await Promise.all(
    donationItemImageLocalPath.map(uploadOnCloudinary)
  );

  if (!donationItemImage || donationItemImage.length === 0) {
    throw new ApiError(400, "Failed to upload donation item image");
  }

  // Step 4: Create a donation entry in the database
  const donate = await Donate.create({
    donationItem,
    donationType,
    donationItemImage: donationItemImage.map(img => img.url),
    donationBy,
    donatedTo,
    donatedToModel,
    senderName,
    senderEmail,
    message
  });

  // Step 5: Populate the donation with relevant data and return a response
  const populatedDonation = await Donate.findById(donate._id)
    .populate('donationBy', 'username email')  // Populate the donor's info
    .populate({
      path: 'donatedTo', 
      model: donatedToModel
    })
    .lean();

  const displayName = donatedToModel === 'Hospital'
    ? populatedDonation.donatedTo.hospitalName || populatedDonation.donatedTo.name
    : populatedDonation.donatedTo.HomeName || populatedDonation.donatedTo.name;

  // Step 6: Respond with the populated donation data
  return res.status(200).json({
    status: 200,
    message: "Donation Successful",
    data: {
      ...populatedDonation,
      donatedToName: displayName
    }
  });
});

export { donatingItem };
