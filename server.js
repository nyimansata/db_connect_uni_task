require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const User = require("./models/user");

const app = express();

// Database Connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING, { dbName: "connect_db" })
  .then(() => {
    console.log("Database connected successfully");
    const port = process.env.PORT;
    app.listen(port, (req, res) => {
      console.log("App listing to port:", port);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api/v1/users", userRoute);

// ejs
app.set("view engine", "ejs");

// home route
app.get("/", async (req, res) => {
  const users = await User.find();
  res.render("home", { users });
});
