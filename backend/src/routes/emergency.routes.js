import express from "express";
import { raiseEmergency, getAllEmergencies } from "../controllers/emergency.controller.js";
import { upload } from "../midllewears/multer.middlewears.js";
import { authenticateUser } from "../midllewears/authentication.middlewear.js";

const router = express.Router();

router.post("/raise",authenticateUser, upload.fields([{ name: "emergencyImages", maxCount: 5 }]), raiseEmergency);
router.get('/emergencies', getAllEmergencies);
export default router;
