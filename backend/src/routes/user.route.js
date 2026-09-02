import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(userAuth, signUp);

export default router