const express = require("express")
const { createUser, login } = require("../controllers/userController")
const router = express.Router();

//For creating a new user
router.post("/", createUser);

// For loging in
router.post("/login", login);

module.exports = router