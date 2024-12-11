const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users/me", auth);

// Unprotected routes
app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use("/", mainRouter);

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
