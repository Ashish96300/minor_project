import { Router } from "express";
import contactOwner from "../controllers/nodeMailer.controller.js";

const router = Router();

// Use the dynamic animalId in the route
router.route("/:animalId/email").post(contactOwner);

export default router;
