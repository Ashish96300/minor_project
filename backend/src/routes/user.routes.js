import {Router} from "express"
import { logoutUser, registerUser } from "../controllers/user.controller.js"
import { loginUser } from "../controllers/user.controller.js"
import { updateAccountDetails } from "../controllers/user.controller.js"
import { upload } from "../midllewears/multer.middlewears.js"
import { authenticateUser } from "../midllewears/authentication.middlewear.js"

const router=Router()

router.route("/register").post(upload.single("avatar") ,registerUser)
router.route("/login").post(loginUser , (req, res) => {
    console.log("Login route hit");
  })
router.route("/update").post(updateAccountDetails)
router.route("/logout").post(authenticateUser , logoutUser)

export default router