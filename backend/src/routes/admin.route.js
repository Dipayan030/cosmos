import { Router } from "express";
import { adminLogin, getUsers } from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(verifyToken, adminLogin)
router.route("/users").post(getUsers)

export default router