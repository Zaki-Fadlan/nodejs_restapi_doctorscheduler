import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import doctorScheduleRoutes from "./routes/doctor_schedule";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import dotenv from "dotenv";
import { sendError } from "./utils/response";
import Logger from "./config/logger";
import morganMiddleware from "./config/morgan";
import fs from "fs";
import path from "path";

// Create logs directory if it doesn't exist
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/doctor_schedule", doctorScheduleRoutes);
// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Logger.error(`Error: ${err.message}`);
    Logger.error(err.stack || "No stack trace available");
    sendError(res, 500, "Something went wrong!");
  }
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
});
