import { Router } from "express";
import htmlRoutes from "./html.routes.js";
import apiRoutes from "./api.routes.js";

const router = Router();

// Mount route modules
router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

export default router;
