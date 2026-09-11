import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { adminAuth } from "../middlewares/auth.middleware.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { getPlanets, addPlanets, editPlanets, deletePlanets } from "../controllers/planet.controller.js";
import { editBookings, getBookings } from "../controllers/booking.controller.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();

router.use(adminAuth)

router.route("/login").post(adminLogin)

router.route("/users/show").get(getUsers)

router.route("/planets/show").get(getPlanets)
router.route("/planets/add").post(upload.single('image'), addPlanets)
router.route("/planets/edit/:id").post(upload.single('image'), editPlanets)
router.route("/plantes/delete/:id").delete(deletePlanets)

router.route("/bookings/show").get(getBookings)
router.route("/bookings/edit/:id").post(editBookings)

export default router