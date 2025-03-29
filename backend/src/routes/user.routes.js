import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
import { loginUser } from "../controllers/user.controller.js"
import { updateAccountDetails } from "../controllers/user.controller.js"
import { upload } from "../midllewears/multer.middlewears.js"

const router=Router()

router.route("/register").post(upload.single("avatar") ,registerUser)
router.route("/login").post(loginUser)
router.route("/update").post(updateAccountDetails)

export default router