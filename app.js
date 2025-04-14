const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
require("dotenv").config();
const errorHandler = require("./middlewares/errorhandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(express.json());
app.use(cors());

// Log every request
app.use(requestLogger);

// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Unprotected routes
app.use("/", mainRouter);

// Log errors
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Centralized error handler — should come AFTER routes
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));

// Start server
const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
