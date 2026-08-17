import { Router } from "express";
import { adminLogin, getUsers } from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getPlanets, addPlanets } from "../controllers/planet.controller.js";
import { getBookings } from "../controllers/booking.controller.js";

const router = Router();

router.route("/login").post(verifyToken, adminLogin)

router.route("/planets/show").post(getPlanets)
router.route("planet/add").get(addPlanets)

router.route("bookings/show").post(getBookings)

export default router