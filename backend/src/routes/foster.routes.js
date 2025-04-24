import {Router} from 'express'
import { getAllfosterHome, registerHome, updatefosterHome } from "../controllers/fosterHome.controller.js";
import { upload } from "../midllewears/multer.middlewears.js"; 
import { authenticateUser } from "../midllewears/authentication.middlewear.js";

const router =Router();

router.route("/Add").post(upload.fields([
    {name:"Avatar" ,maxCount:1},
    {name:"Image" ,maxCount:5},
]) ,authenticateUser ,registerHome)

router.route("/Read").post(getAllfosterHome);

router.route("/Update").post(updatefosterHome);

export default router;
