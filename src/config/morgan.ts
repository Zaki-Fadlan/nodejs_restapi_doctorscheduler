import morgan, { StreamOptions } from "morgan";
import Logger from "./logger";

// Override the stream method by telling Morgan to use our custom logger
const stream: StreamOptions = {
  write: (message) => Logger.http(message.trim()),
};

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define log format
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default morganMiddleware;
