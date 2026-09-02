import { Router } from "express";
import { addBooking, cancelBooking, showBookings } from "../controllers/booking.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(userAuth)

router.route("/book/:id").get(addBooking)
router.route("/show").post(showBookings)
router.route("/cancel/:id").post(cancelBooking)

export default router