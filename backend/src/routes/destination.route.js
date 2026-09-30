import { Router } from "express";
import { getPlanetById, getPlanets } from "../controllers/planet.controller.js";

const router = Router();

router.route("/show").get(getPlanets)
router.route("/show/:id").get(getPlanetById)

export default router