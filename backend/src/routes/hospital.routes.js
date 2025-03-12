import { Router } from "express";
import { getAllHospital, registerHospital } from "../controllers/hospital.controller.js";
import { upload } from "../midllewears/multer.middlewears.js"; // Import Multer middleware

const router = Router();

// Use Multer for file uploads in registerHospital route
router.route("/Add").post(upload.single("avatarH"), registerHospital);
router.route("/Read").post(getAllHospital);

export default router;
