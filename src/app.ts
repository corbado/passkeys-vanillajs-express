import express, { Application } from "express";
import path from "path";
import cors from "cors";
import compression from "compression";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error-handler.js";
import { loggerMiddleware } from "./utils/logger.js";
import cookieParser from "cookie-parser";
import { authenticateMiddleware } from "./middleware/auth.js";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    public listen() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    private initializeMiddlewares() {
        // Security middlewares
        this.app.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true,
            }),
        );

        // Logging middleware
        this.app.use(morgan("dev"));
        this.app.use(loggerMiddleware);

        // Performance middlewares
        this.app.use(compression());

        // Parsing middlewares
        this.app.use(
            express.json({
                limit: "10kb", // Protect against large payloads
            }),
        );
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: "10kb",
            }),
        );

        // Cookie and session parsing
        this.app.use(cookieParser());

        // Authentication middleware
        this.app.use(authenticateMiddleware);

        // View engine setup
        this.app.use(expressLayouts);
        this.app.set("view engine", "ejs");
        this.app.set("layout", "layouts/main");
        this.app.set("views", path.join(process.cwd(), "/views"));

        // Static file serving
        this.app.use(express.static(path.join(process.cwd(), "/public")));
    }

    private initializeRoutes() {
        this.app.use("/", routes);
    }

    private initializeErrorHandling() {
        this.app.use(errorHandler);
    }
}

export default new App();
