// import { Donate } from "../models/donate.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Donate} from "../models/donate.model.js";
import {Hospital} from "../models/hospitals.model.js";
import {FosterHome} from "../models/fosterHome.model.js";

const donatingItem = asyncHandler(async (req, res) => {
  const { donationItem, donationType, donatedToModel, donatedTo , message } = req.body;
  const donationBy = req.user._id;

  // Step 1: Validate donatedToModel
  if (!['Hospital', 'FosterHome'].includes(donatedToModel)) {
    throw new ApiError(400, "Invalid donatedToModel. Must be 'Hospital' or 'FosterHome'");
  }

  // Step 2: Select model and create query based on type
  const Model = donatedToModel === 'Hospital' ? Hospital : FosterHome;

  const query = donatedToModel === 'Hospital'
    ? { $or: [{ name: donatedTo }, { hospitalName: donatedTo }] }
    : { $or: [{ name: donatedTo }, { HomeName: donatedTo }] };

  const donatedToDoc = await Model.findOne(query);

  if (!donatedToDoc) {
    throw new ApiError(404, `${donatedToModel} with name '${donatedTo}' not found`);
  }

  const donatedToId = donatedToDoc._id;

  // Step 3: Handle image upload
  //const donationItemImageLocalPath = req.files?.map(file => file.path) || [];
  const donationItemImageLocalPath  = req.files?.donationItemImage?.map(file => file.path) || [];

  if (donationItemImageLocalPath.length === 0) {
    throw new ApiError(400, "Donation item image is required");
  }

  let donationItemImage;
  try {
    donationItemImage = await Promise.all(
      donationItemImageLocalPath.map(uploadOnCloudinary)
    );
  } catch (err) {
    throw new ApiError(500, "Cloudinary upload failed");
  }

  if (!donationItemImage || donationItemImage.length === 0) {
    throw new ApiError(400, "Failed to upload donation item image");
  }

  // Step 4: Create donation record
  const donate = await Donate.create({
    donationItem,
    donationType,
    donationItemImage: donationItemImage.map(img => img.url),
    donationBy,
    donatedTo: donatedToId,
    donatedToModel,
    message
    
  });

  // Step 5: Populate response
  const populatedDonation = await Donate.findById(donate._id)
    .populate('donationBy', 'username email')
    .populate({
      path: 'donatedTo',
      model: donatedToModel
    })
    .lean();

  const displayName = donatedToModel === 'Hospital'
    ? populatedDonation.donatedTo.hospitalName || populatedDonation.donatedTo.name
    : populatedDonation.donatedTo.HomeName || populatedDonation.donatedTo.name;

  return res.status(200).json(
    new ApiResponse(200, {
      ...populatedDonation,
      displayName
    }, "Donation Successful")
  );
});

export { donatingItem };
