import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import taskRouterHelperInstance from "./helpers/TaskRouterHelper.js";

dotenv.config(); // Load environment variables from .env file

// Help avoid writing try and catch for all async requests
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res)).catch((error) => {
    console.log(error);
    next(error);
  });
};

const app = express();
app.use(express.json()); // Helps parse JSON bodies
app.use(cors());

const port = process.env.PORT || 3000;

app.get(
  "/list-workers",
  asyncHandler(async (_req, res) => {
    const workers = await taskRouterHelperInstance.listWorkers();
    res.send(workers);
  })
);

app.get("/", (_req, res) => {
  res.send("Hello there!");
});
const errorHandler = (err, _req, res, _next) => {
  console.error("Error:", err.message || err);

  // Generic status code and error message
  res.status(500).json({ error: "Something went wrong on the server" });
};

app.use(errorHandler); // To catch errors and prevent server crashes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
