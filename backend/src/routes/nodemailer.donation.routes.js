import { Router } from "express";

import  giveDonation  from "../controllers/nodeMailerDonation.controller.js";
import { upload } from "../midllewears/multer.middlewears.js";

const router = Router();

router.route('/:donationId/email').post(
    upload.fields([{ name: "donationItemImage", maxCount: 5 }]),
    giveDonation)


export default router;
