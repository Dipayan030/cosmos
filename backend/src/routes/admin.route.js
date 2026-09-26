import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { adminAuth } from "../middlewares/auth.middleware.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { getPlanets, addPlanets, editPlanets, deletePlanets, toggleStatusPlanet, csvExportPlanets } from "../controllers/planet.controller.js";
import { csvExportBookings, getBookings, toggleBookingsStatus } from "../controllers/booking.controller.js";
import { csvExportUsers, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.use(adminAuth)

router.route("/login").post(adminLogin)

router.route("/users/show").get(getUsers)
router.route("/users/export").get(csvExportUsers)

router.route("/planets/show").get(getPlanets)
router.route("/planets/status/:id").post(toggleStatusPlanet)
router.route("/planets/add").post(upload.single('image'), addPlanets)
router.route("/planets/edit/:id").post(upload.single('image'), editPlanets)
router.route("/planets/delete/:id").delete(deletePlanets)
router.route("/planets/export").get(csvExportPlanets)

router.route("/bookings/show").get(getBookings)
router.route("/bookings/statusToggle/:id").post(toggleBookingsStatus)
router.route("/bookings/export").post(csvExportBookings)

export default router