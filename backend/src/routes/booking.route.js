import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getBookings } from "../controllers/booking.controller.js";

const router = Router();

router.route("/show").post(getBookings);

export default router