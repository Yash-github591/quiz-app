const express = require("express");
const authController = require("../controllers/AuthController");
const { register, login, logout, getProfile, getProfileById } = authController;
const { checkLogin } = require("../middleware/middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/currentUser", checkLogin, getProfile);
router.get("/profile/:id", getProfileById);

module.exports = router;
