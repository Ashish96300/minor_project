import {Router} from 'express'
import { authenticateUser  } from '../midllewears/authentication.middlewear.js';
import { animalRegister, getAllAnimal } from '../controllers/animal.controller.js'

import { upload } from "../midllewears/multer.middlewears.js";

const router =Router();

router.route('/Register').post(upload.single("image") ,authenticateUser, animalRegister)
router.route('/getAnimal').post(getAllAnimal)

export default router;