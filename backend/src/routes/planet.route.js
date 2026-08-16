import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addPlanets, getPlanets } from "../controllers/planet.controller.js";


const router = Router();

router.route("/show").post(getPlanets)
router.route("/add").post(addPlanets)

export default router