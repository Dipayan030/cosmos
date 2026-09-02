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

router.route("/users/show").post(getUsers)

router.route("/planets/show").post(getPlanets)
router.route("/planets/add").get(upload.single('image'), addPlanets)
router.route("/planets/edit/:id").get(upload.single('image'), editPlanets)
router.route("/plantes/delete/:id").delete(deletePlanets)

router.route("/bookings/show").post(getBookings)
router.route("/bookings/edit/:id").get(editBookings)

export default router