import nodemailer from "nodemailer";  // Corrected import
import { asyncHandler } from "../utils/asyncHandler.js";
import { Donate } from "../models/donate.model.js"; // Assuming Donate is the model name

// formData.append("donationItem", donationItem);
// formData.append("donationType", donationType);
// formData.append("message", message);
// formData.append("donatedTo", donatedTo);
// formData.append("donatedToModel", donatedToModel);

const givedonation = asyncHandler(async (req, res) => {   
    console.log("givedonation route hit");          
    const { message, donationBy } = req.body;
    const files = req.files?.donationItemImage || [];

    const { donationId } = req.params;
    console.log(donationId)
    //console.log("Request received: ", { message, senderName, senderEmail, donationId });

    if (!message || !donationId) {
        return res.status(400).json({ message: "Donation ID, message, and sender email are required" });
    }

    const donation = await Donate.findById(donationId).populate("donationBy", "email username donationItem donationType");
    
    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    const ownerEmail = donation.donationBy.email;
    const donor = donation.donationBy.username;
    const donationItem = donation.donationItem;
    const donationType = donation.donationType;
    console.log(ownerEmail)
    if (!ownerEmail) {
        return res.status(400).json({ message: "Owner email not found" });
    }

    console.log(process.env.EMAIL_USER, " ", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Make sure you have the right email
            pass: process.env.EMAIL_PASS, // App password if using Gmail
        },
    });

    try {
        await transporter.sendMail({
            from: `"Little Paws" <${process.env.EMAIL_USER}>`,
            to: ownerEmail,
            subject: `New Donation Received - ${donationType}`,
            html: `
                <h3>New Donation Received</h3>
                <p><strong>Item:</strong> ${donationItem}</p>
                <p><strong>Donated By:</strong> ${donor}</p>
                <p><strong>Type:</strong> ${donationType}</p>
                <p><strong>Message:</strong> ${message}</p>
                 ${files.map((file, index) => `
                    <p><strong>Image ${index + 1}:</strong></p>
                    <img src="cid:donationItemImage${index}" style="max-width: 300px;" />
                `).join('')}
                <p>Please check your Little Paws dashboard for more details.</p>
            `,
            attachments: files.map((file, index) => ({
                filename: file.originalname,
                content: file.buffer,
                cid: `donationItemImage${index}`
            }))
        });

        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
    }
    
});

export default givedonation;
