import { Router } from "express";
import rateLimiter from "express-rate-limit";
import { login, logout, register } from "../controller/authController.js";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

router.post("/register", apiLimiter, register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
