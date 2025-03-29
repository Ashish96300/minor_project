import {Router} from 'express'
import { authenticateUser  } from '../midllewears/authentication.middlewear.js';
import { animalRegister } from '../controllers/animal.controller.js'

import { upload } from "../midllewears/multer.middlewears.js";

const router =Router();

router.route('/Register').post(upload.single("image") ,authenticateUser, animalRegister)


export default router;