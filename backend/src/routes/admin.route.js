import { Router } from "express";
import { adminLogin } from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").get(verifyToken, adminLogin)

export default router