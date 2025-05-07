import nodemailer from "nodemailer";  // Corrected import
import { asyncHandler } from "../utils/asyncHandler.js";
import { Donate } from "../models/donate.model.js"; // Assuming Donate is the model name

const givedonation = asyncHandler(async (req, res) => {
    const { message, senderName, senderEmail } = req.body;
    const { donationId } = req.params;
    
    console.log("Request received: ", { message, senderName, senderEmail, donationId });

    if (!message || !senderEmail || !donationId) {
        return res.status(400).json({ message: "Donation ID, message, and sender email are required" });
    }

    const donation = await Donate.findById(donationId).populate("donatedBy", "email username donationItem donationType");
    
    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    const ownerEmail = donation.donatedBy.email;
    const donor = donation.donatedBy.username;
    const donationItem = donation.donationItem;
    const donationType = donation.donationType;

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
                <p>Please check your Little Paws dashboard for more details.</p>
            `,
        });

        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
    }
});

export default givedonation;
