import { asyncHandler } from "../utils/asyncHandler.js";  
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";
import jwt from "jsonwebtoken";
import { upload } from "../midllewears/multer.middlewears.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // ⚠️ DO NOT store accessToken & refreshToken in DB
        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Token Generation Error:", error);
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};





//registering user

const registerUser=asyncHandler(async (req ,res)=>{
   res.status(200).json({                   //res.status(200).json({...}) is an Express.js response method used to send a JSON response with an HTTP status code.
        message:"ok"
    })

    const {fullName ,email ,username ,password}=req.body
    //console.log("username:" ,username);

    /*if (fullname==="") {
        throw new ApiError(400 ,"fullname is required")
    } else {
        
    }*/


    //to check if all fields inputted or not

    if (
        [fullName ,email,username ,password]
        .some((field)=>field?.trim()==="")                      //.some() method loops through the array [fullname, email, username, password] and assigns each value to field one by one.
    ) {                                                        //then if field h toh spaces trim krdo and if nhi toh error throw
        throw new ApiError(400,"all fields are required");
    }

    //checking if user already exist or not
    const existedUSer=await User.findOne({
        $or:[{username} ,{email}]
        
    })
    if(existedUSer){
        throw new ApiError(409 ,'user already exist')
    }
    const avatarLocalPath = req.file?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar file required');
    }
    
    // Upload to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath); 
    
    if (!avatar) {
        throw new ApiError(400, 'Avatar upload failed');
    }
    
    //upload on db
    const user=await User.create({
        username,
        email,
        avatar:avatar?.url,
        fullName,
        password
    })
    const createdUser=user.findById(user._id).select('-password -refreshToken')
    if(!createdUser){
        throw new ApiError(400 ,'failed registering user')
    }
    return res.
    status(201).
    json(new ApiResponse(200 ,createdUser ,'user registered sucessfully'))
    

})

/************************************************************************************************************************************************************** */
//login user
const loginUser=asyncHandler(async(req,res)=>{

const {username ,email ,password}=req.body;
console.log(username)

        if(!username&&!email){
        console.log('hiii')
        throw new ApiError(400 ,'username or email required');
       
    }

   
const user =await User.findOne({                           
    $or:[{username} ,{email}]                          
})
if(!user){
    console.log('no user')
   throw new ApiError(404 ,'please enter correct details')
}

const isPasswordValid =await user.isPasswordCorrect(password)

if(!isPasswordValid){
    throw new ApiError(401 ,'invalid user credentials')
}
const{accessToken ,refreshToken} =await generateAccessAndRefreshTokens(user._id) //holding tokens

   
   const loggedinUser=await User.findById(user._id).
   select("-password -refreshToken")
                                                            //sending in cookies
   const options={
    httpOnly:true,                     //koi bhi modify nhi kr payega
    secure:true
   }
   return res
   .status(200)
   .cookie("accessToken" ,accessToken ,options)
   .cookie("refreshToken" ,refreshToken ,options)
   .json(
    new ApiResponse(
        200,
        { accessToken, refreshToken, user: loggedinUser },
        "User logged in"
    )

   )
   
})
/****************************************************************************************************************************************** */ 
const logoutUser =asyncHandler(async(req ,res)=>{
    //clearing cookies first

    await User.findByIdAndUpdate(                   //findByIdAndUpdate is a Mongoose method used to find a document (record) by its _id and update its fields in a MongoDB database.
      
        req.user._id,{
        
            $set:{                                                  //set will ask for fieds to be updated and it will update it
                refreshToken:undefined
            }
        },
        {
            new:true        //update ho jaye toh bta dena
        }
    )
    const options={
    httpOnly:true,
    secure:true
   }
   return res
   .status(200)
   .clearCookie("accessToken" ,options)
   .clearCookie("refreshToken" ,options)
   .json(new ApiResponse(200 ,{} ,"user logged out"))
})
/****************************************************************************************************************************************** */ 

//to make a end point from where user can refresh his access token 

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefrehToken =req.cookies.refreshToken || req.body.refreshToken                 //accessing it through cookie
    if(!incomingRefrehToken){
        throw new ApiError(401 ,'anauthorized request')
    }
   try {
     const decodedToken = jwt.verify(incomingRefrehToken ,REFRESH_TOKEN_SECRET)        //jwt verify ,verify krke decode kr deta h ,token ko
 
     const user=await User.findById(decodedToken?._id)   //decoded token ko unwrap krke usme se id nikal lo
 
     if(!user){
         throw new ApiError(401 ,'invalid refresh token')
     }
     //camparing user token and incomingrefresh token decoded jo aya h
     if(incomingRefrehToken!==user?.refreshToken)            //controller m sab se top pr ham ,refresh token ko user m save krwaya tha
     {
         throw new ApiError(401 ,"refresh token is expired or used")
     }
     //generating new token
     const options={
         httpOnly:true,
         secure:true
     }
     const {accessToken ,refreshToken}=await generateAccessAndRefreshTokens(user._id)
     
     return res
     .status(200)
     .cookie("access token" ,accessToken,options)
     .cookie("refresh token" ,refreshToken,options)
     .json(
         new ApiResponse(
             200,{accessToken ,refreshToken: newRefreshToken },"access token refreshed"
         )
     )
   } catch (error) {
    throw new ApiError(401 ,error?.message||"invaid refresh token")
   }
})


/************************************************************************************************************************************************** */

/*making users for subscrber login*/

const changeCurrentPassword = asyncHandler(async(req ,res)=>{
    const{oldPassword ,newPassword}=req.body
    
    const user = await user.findById(req.user?._id)
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)

    if(isPasswordCorrect){
        throw new ApiError(400 ,'invalid old password')
    }
    user.password =newPassword
    await user.save({validateBeforeSave :false})

    return res
    .status(200)
    .json(new ApiResponse(200 ,{} ,"password changed successfully"))
})

/*getting user */

const getCurrentUSer =asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200 ,req.user ,"current user fetch successfully"))
})

const updateAccountDetails =asyncHandler(async(req ,res)=>{
    const{username ,email }=req.body

    if (username||email) {
        throw new ApiError(400 ,"all fields req")
    }

    const user=await User.findByIdAndUpdate(req.user?._id
    ,{
        $set:{
            username:username,
            email:email
        }
    }
    ,{new:true}
).select('-password')

return res
.status(200)
.json(new ApiResponse(200 ,user ,"account details updated"))
})

const updateUserAvatar =asyncHandler(async(req ,res)=>{
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400 ,"avatar file missing")
    }
    const avatar =await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400 ,"error while uploading on avatar")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar:avatar.url
            }
        },{new:true}
    ).select("-password")
    return res.status.json(new ApiResponse(200 ,user ,"avatar update successfully"))
})



export {
    loginUser,
    registerUser,
    logoutUser ,
    refreshAccessToken ,
    changeCurrentPassword ,
    updateAccountDetails ,
    updateUserAvatar ,
    getCurrentUSer
    
}




