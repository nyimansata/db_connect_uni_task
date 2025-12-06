const express = require("express");

const router = express.Router();
const User = require("../models/user");

// get all users
router.get("/", async (req, res) => {
  const userList = await User.find();
  res.send(userList, "List of all users");
});

// create a user
router.post("/", async (req, res) => {
  try {
    const newUser = await new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      message: req.body.message,
    });

    const saveUser = User.create(newUser);
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    const userId = await User.findById(req.params.id);

    if (!userId) {
      return res.status(404).send("user  not found");
    }

    res.send(userId);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete user by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }

    res.send(deleteUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update user by id
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message,
      },
      { new: true }
    );
    res.send(updateUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
