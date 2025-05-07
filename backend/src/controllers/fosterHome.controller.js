import { FosterHome } from "../models/fosterHome.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerHome = asyncHandler(async(req ,res)=>{
    const {Email ,HomeName ,Address ,Contact ,Descrpition} =req.body;
    const Admin =req.user._id

    if([Email ,HomeName ,Address ,Contact ,Descrpition].some((field)=>field?.trim==="")){
        throw new ApiError(401 ,'All field required');
    }

    const ifRegistered = await FosterHome.findOne({
        $or: [{ HomeName }, { Email }]
    });

    if(ifRegistered){
        throw new ApiError(404 ,'Foster Home already registered with this Email')
    }
    const AvatarLocalPath =req.files?.Avatar?.[0]?.path;
    const ImageLocalPath =req.files?.Image?.map(file=>file.path)||[];
    //console.log('image',ImageLocalPath)
    if(!AvatarLocalPath || !ImageLocalPath){
        throw new ApiError(402 ,'please upload Avatar or Image');
    }

    const Avatar =await uploadOnCloudinary(AvatarLocalPath);
    const Image =await Promise.all(ImageLocalPath.map(uploadOnCloudinary));
    console.log('image',Image.url)
    console.log('image',Image)
    if(!Avatar?.url){
        throw new ApiError(405 ,'Avatar or Image uploadation failed');
    }

    const fosterHome = await FosterHome.create({
        Email ,
        HomeName ,
        Address ,
        Descrpition ,
        Contact,
        Avatar: Avatar?.url ,
        Image :Image.map(img=>img.url),
        Admin
    })
    const registeredHome =await FosterHome.findById(fosterHome._id).populate('Admin' ,'username email');
    if(!registeredHome){
        throw new ApiError(404 ,'Something went wrong while registering')
    }
    return res.
    status(201).
    json(new ApiResponse( 201 ,registerHome ,'Foster Home Registerd Successfully'))

})

// const getAllfosterHome=asyncHandler(async(req ,res)=>{
//     const findfosterHome=await FosterHome.find()
    
    

//     if(!findfosterHome.length === 0){
//         throw new ApiError(400 ,'No fosterHome details found')
//     }
   
//     return res
//     .status(200)
//     .json(new ApiResponse(200 ,findfosterHOme ,'foster home details'))
// })

const getAllfosterHome = asyncHandler(async (req, res) => {
    try {
        const findfosterHome=await FosterHome.find()
    
        .populate('Admin', 'username email'); 
  

      if (findfosterHome.length === 0) {
        return res
          .status(404)
          .json(new ApiResponse(404, [], 'No foster home details found'));
      }
  
      return res
        .status(200)
        .json(new ApiResponse(200, { HomeNames: findfosterHome }, 'All foster home details'));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Server Error'));
    }
  });


const updatefosterHome =asyncHandler(async(req ,res)=>{
    const {fosterHomeId}=req.params;
    const loggedInAdmin=req.user._id;

    const fosterHome = await FosterHome.findById(fosterHomeId);
    if (!fosterHome) {
        throw new ApiError(404, "foster Home not found");
    }
    if(fosterHome.Admin.toString() !==loggedInAdmin.toString()){
        throw new ApiError(444 ,'Only admins allowed to update')
    }
    const updatedfosterHome= await fosterHome.findByIdAndUpdate(fosterHomeId, req.body, { new: true });

    return res.status(200).json(new ApiResponse(200, updatedfosterHome, "foster Home updated successfully"));
})
export{registerHome ,getAllfosterHome ,updatefosterHome}