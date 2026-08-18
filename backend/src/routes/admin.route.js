import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { getPlanets, addPlanets } from "../controllers/planet.controller.js";
import { getBookings } from "../controllers/booking.controller.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();

router.use(adminAuth)

router.route("/login").post(adminLogin)

router.route("/users/show").post(getUsers)

router.route("/planets/show").post(getPlanets)
router.route("/planets/add").get(addPlanets)

router.route("/bookings/show").post(getBookings)

export default router