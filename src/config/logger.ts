import winston from "winston";
import path from "path";

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level based on environment
const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "warn";
};

// Define colors for each level
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Add colors to winston
winston.addColors(colors);

// Define Winston format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

//  file paths for logs
const logDir = "logs";
const errorLog = path.join(logDir, "error.log");
const combinedLog = path.join(logDir, "combined.log");
const httpLog = path.join(logDir, "http.log");

// Initialize logger with base configuration
const Logger = winston.createLogger({
  level: level(),
  levels,
});

// Add file transports
Logger.add(
  new winston.transports.File({
    filename: errorLog,
    level: "error",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  })
);

Logger.add(
  new winston.transports.File({
    filename: combinedLog,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  })
);

Logger.add(
  new winston.transports.File({
    filename: httpLog,
    level: "http",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  })
);

// Add console transport in development
if (process.env.NODE_ENV !== "production") {
  Logger.add(
    new winston.transports.Console({
      format,
    })
  );
}

export default Logger;
