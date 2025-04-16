import { Hospital} from "../models/hospitals.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";            //CRUD-CREATE ,READ ,UPDATE ,DELETE
import { ApiError } from "../utils/ApiError.js";
import { upload } from "../midllewears/multer.middlewears.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerHospital = asyncHandler(async (req, res) => {
    const { hospitalName, email, helpLineNumber, address } = req.body;
    const Admin = req.user._id;

    // Check for empty fields
    if ([hospitalName, email, helpLineNumber, address].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if hospital already exists
    const existedHospital = await Hospital.findOne({
        $or: [{ hospitalName }, { email }]
    });

    if (existedHospital) {
        throw new ApiError(409, "Hospital already exists");
    }

    // Handle File Uploads
    const avatarHLocalPath = req.files?.avatarH?.[0]?.path;
    const imagesHLocalPath = req.files?.imagesH?.map(file => file.path) || [];

   // console.log('imagespath',imagesHLocalPath )
    if (!avatarHLocalPath) {
        throw new ApiError(400, "Avatar file required");
    }

    // Upload files to Cloudinary
    const avatarH = await uploadOnCloudinary(avatarHLocalPath);
    const imagesH = imagesHLocalPath.length > 0 ? await Promise.all(imagesHLocalPath.map(uploadOnCloudinary)) : [];
    //console.log("Cloudinary Upload Response:", imagesH);
    //console.log('imageurl',imagesH.url)
    if (!avatarH || !avatarH.url) {
        throw new ApiError(400, "Failed to upload avatar");
    }

    // Create hospital
    const hospital = await Hospital.create({
        hospitalName,
        email,
        avatarH: avatarH.url,
        imagesH: imagesH.map(img => img.url),
        address,
        helpLineNumber,
        Admin
    });

    // Populate admin details
    const populateHospital = await Hospital.findById(hospital._id).populate('Admin', 'username email');

    if (!populateHospital) {
        throw new ApiError(400, "Failed to register hospital");
    }

    return res.status(200).json(new ApiResponse(200, populateHospital, "Hospital registered"));
});
/************************************************************************************************************************************************************* */

//  READ

const getAllHospital=asyncHandler(async(req ,res)=>{
    const {hospitalName ,email}=req.body
    const findHospital=await Hospital.findOne({
        $or:[{hospitalName} ,{email} ,{address}]
    })
      //console.log(findHospital)
    

    if(!findHospital){
        throw new ApiError(400 ,'No hospital details found')
    }
   
    return res
    .status(200)
    .json(new ApiResponse(200 ,findHospital ,'hospital details'))
})
/******************************************************************************************************************************************************* */

/*const updateHospital =asyncHandler(async(req ,res)=>{
    const hospitalId=req.params.id;
    //console.log('Admin:',hospitalId)
   
    const loggedInAdmin=req.user._id;
  //  const hospital = await Hospital.findOne({Admin})
   
    if (!hospital) {
        throw new ApiError(404, "Hospital not found");
    }
    if(hospital.Admin.toString() !==loggedInAdmin.toString()){
        throw new ApiError(444 ,'Only admins allowed to update')
    }
    const updatedHospital = await Hospital.findByIdAndUpdate(hospitalId, req.body, { new: true });

    return res.status(200).json(new ApiResponse(200, updatedHospital, "Hospital updated successfully"));
})*/
const updateHospital= asyncHandler(async (req, res) => {})
   

/****************************************************************************************************************** */
/**DELETE */


/*********************************************************************************************************************** */
export {registerHospital ,getAllHospital ,updateHospital}