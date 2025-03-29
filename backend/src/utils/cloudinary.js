import {v2 as cloudinary} from "cloudinary";

import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) {
            console.log("No local file path provided.");
            return null
        }
        console.log("Uploading file to Cloudinary:", localFilePath);
        //upload the file on cloudinary
        console.log("Cloudinary Config:", {
            cloud_name: cloudinary.config().cloud_name,
            api_key: cloudinary.config().api_key,
            api_secret: cloudinary.config().api_secret ? "Exists" : "Missing"
        });
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
       // console.log('file has been uploaded successfull')
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error(" Cloudinary Upload Error:", error);
        if (fs.existsSync(localFilePath));
        return null;
    }
}



export {uploadOnCloudinary}