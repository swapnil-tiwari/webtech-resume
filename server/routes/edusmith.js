const express = require("express");
// const passport = require('passport');
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);
router.post("/register", userController.googleOAuth);


module.exports = router;