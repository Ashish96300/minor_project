
import { Hospital} from "../models/hospitals.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";            //CRUD-CREATE ,READ ,UPDATE ,DELETE
import { ApiError } from "../utils/ApiError.js";
import { upload } from "../midllewears/multer.middlewears.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// CREATE   
const registerHospital =asyncHandler(async(req ,res)=>{
    res.status(200).json({                   
        message:"ok"
    })
    const{hospitalName ,email ,helpLineNumber ,address} =req.body;
    console.log(hospitalName);
    console.log(helpLineNumber)

    if([hospitalName ,email ,helpLineNumber ,address]
    .some((field)=>field?.trim==="")
    ){                                                        
        throw new ApiError(400,"all fields are required");
    }

    const existedHospital=await Hospital.findOne({
        $or:[{hospitalName} ,{email}]
    })
    if(existedHospital){
        throw new ApiError(409 ,'Hospital already exist')
    }

    const avatarHLocalPath=req.file?.path;
    console.log(avatarHLocalPath);
    
    if(!avatarHLocalPath){
        throw new ApiError(400, 'avatar file required')
    }
    console.log("Uploaded File Details:", req.file);
  
    const avatarH = await uploadOnCloudinary(avatarHLocalPath);
    console.log("Uploaded to Cloudinary:", avatarH);

    if (!avatarH || !avatarH.url) {
    throw new ApiError(400, "Failed to upload avatar");
    }
    

    const hospital =await Hospital.create({
        hospitalName,
        email,
        avatarH:avatarH.url,
        address,
        helpLineNumber
    })

    const registerHospital=Hospital.findById(Hospital._id)
    if(!registerHospital){
        throw new ApiError(400 ,'failed registering hospital')
    }
    return res
    .status(200)
    .json(new ApiResponse(200 ,registerHospital ,'hospital registered'))
})

/************************************************************************************************************************************************************* */

//  READ

const getAllHospital=asyncHandler(async(req ,res)=>{
    const findHospital=await Hospital.find()
      console.log(findHospital)
    

    if(!findHospital){
        throw new ApiError(400 ,'No hospital details found')
    }
   
    return res
    .status(200)
    .json(new ApiResponse(200 ,findHospital ,'hospital details'))
})

export {registerHospital ,getAllHospital}