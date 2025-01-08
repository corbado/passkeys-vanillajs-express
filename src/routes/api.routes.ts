// This file contains all api routes

import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import secretController from "../controller/secret-controller.js";
import profileController from "../controller/profile-controller.js";
import authController from "../controller/auth-controller.js";

const router = Router();

// Health check route
router.get("/", (req, res) => {
    res.json({
        message: "API is running",
        timestamp: new Date().toISOString(),
    });
});
router.get("/secret", requireAuth, secretController.getSecret);
router.post("/user/city", requireAuth, profileController.updateCity);
router.get("/auth/handlelogin", requireAuth, authController.handleLogin);

export default router;
