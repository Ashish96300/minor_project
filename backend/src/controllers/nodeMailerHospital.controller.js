
import nodemailer from 'nodemailer'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Hospital } from '../models/hospitals.model.js';

export const contactHospitalUploader = asyncHandler(async (req, res) => {
  const { message, senderEmail } = req.body;
  const { hospitalId } = req.params; 
  console.log("Request received: ", { message, senderEmail, hospitalId });
  
  if (!hospitalId || !message || !senderEmail) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  const hospital = await Hospital.findById(hospitalId).populate('Admin', 'email username');
  
  if (!hospital.Admin || !hospital.Admin.email) {
    return res.status(404).json(new ApiResponse(404, null, "Hospital admin email not found"));
  }

  if (!hospital || !hospital.Admin) {
    return res
      .status(404)
      .json({ success: false, message: 'Hospital or uploader not found' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: hospital.Admin.email,
    subject: `Inquiry about ${hospital.hospitalName}`,
    text: message,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({ success: true, message: 'Email sent successfully' });
});
