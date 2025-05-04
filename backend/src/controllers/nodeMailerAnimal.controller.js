import nodemailer from 'nodemailer'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Animal } from '../models/animals.model.js';

const contactOwner = asyncHandler(async (req ,res) => {
   const { message ,senderName ,senderEmail} = req.body;
   const { animalId } = req.params; 
    console.log("Request received: ", { message, senderName, senderEmail, animalId });
   if (!message || !senderEmail || !animalId) {
    return res.status(400).json({ message: "Animal ID, message, and sender email are required" });
}
   const animal = await Animal.findById(animalId).populate("uploadedBy", "email username");
   if (!animal) {
    return res.status(404).json({ message: "Animal not found" });
}

    const ownerEmail = animal.uploadedBy.email;
    if (!ownerEmail) {
        return res.status(400).json({ message: "Owner email not found" });
    } 

    console.log(process.env.EMAIL_USER , " " ,  process.env.EMAIL_PASS);
    

    const transporter = nodemailer.createTransport({
        service :'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        }
    });

   const emailSent= await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:ownerEmail,
        subject:"someone is interested in your animal",
        text: `
        You have a message from ${senderName} (Email: ${senderEmail}):

        Message: ${message}

        Please respond accordingly.
    `,
    });
    if(emailSent){
    return res.status(200).json({message:'Email sent successfully'})
    }
    else{
        return res.status(500).json({ message: "Failed to send email" });
    
    }
})

export default contactOwner