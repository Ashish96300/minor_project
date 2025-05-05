import { upload } from "../midllewears/multer.middlewears.js";
import {Router} from 'express';
import { authenticateUser } from "../midllewears/authentication.middlewear.js";
import { donatingItem } from "../controllers/donate.controller.js";


const router = Router();

router.route('/donate').post(
    upload.fields([
        {name:'donationItemImage' ,maxCount:5}
    ]),
    authenticateUser ,donatingItem
);

export default router;