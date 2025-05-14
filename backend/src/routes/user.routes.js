import {Router} from "express"
import { logoutUser, registerUser } from "../controllers/user.controller.js"
import { loginUser } from "../controllers/user.controller.js"
import { updateAccountDetails } from "../controllers/user.controller.js"
import { upload } from "../midllewears/multer.middlewears.js"
import { authenticateUser } from "../midllewears/authentication.middlewear.js"
import { changeCurrentPassword } from "../controllers/user.controller.js"
import { updateUserAvatar } from "../controllers/user.controller.js"

const router=Router()

router.route("/register").post(upload.single("avatar") ,registerUser)
router.route("/login").post(loginUser)
router.route("/update").post(authenticateUser , updateAccountDetails)
router.route("/logout").post(authenticateUser , logoutUser)
router.route("/changepassword").post(authenticateUser , changeCurrentPassword)
router.route("/updateavatar").post(authenticateUser , upload.single("avatar") ,updateUserAvatar)

export default router