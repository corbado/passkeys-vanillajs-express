// This file contains all routes for html page requests

import { Router } from "express";
import homeController from "../controller/home-controller.js";
import userAreaController from "../controller/user-area-controller.js";
import authController from "../controller/auth-controller.js";
import profileController from "../controller/profile-controller.js";
import { redirectIfNotAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/", homeController.renderHomepage);
router.get("/userarea", userAreaController.renderUserArea);
router.get("/login", authController.renderLogin);
router.get("/signup", authController.renderSignup);
router.get(
    "/profile",
    redirectIfNotAuthenticated("/login"),
    profileController.renderProfile,
);
router.get("/signup/onboarding", profileController.renderOnboarding);

export default router;
