import { Router } from "express";
import { getPlanets } from "../controllers/planet.controller.js";

const router = Router();

router.route("/show").post(getPlanets)

export default router