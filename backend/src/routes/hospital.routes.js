import { Router } from "express";
import { getAllHospital, registerHospital, updateHospital } from "../controllers/hospital.controller.js";
import { upload } from "../midllewears/multer.middlewears.js"; // Import Multer middleware
import { authenticateUser } from "../midllewears/authentication.middlewear.js";

const router = Router();

// Use Multer for file uploads in registerHospital route
router.route("/Add").post(
    upload.fields([
        {name: "avatarH" ,maxCount:1},
        {name: "imagesH" ,maxCount:5},
    ]),
    authenticateUser ,registerHospital);

router.route("/Read").post(getAllHospital);

router.route("/Update").post(authenticateUser, updateHospital);

export default router;
