const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorhandler");

const app = express();

app.use(express.json());
app.use(cors());

// Unprotected routes

app.use("/", mainRouter);

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
