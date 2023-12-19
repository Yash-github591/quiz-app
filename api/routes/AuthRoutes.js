const express = require("express");
const authController = require("../controllers/AuthController");
const {
  register,
  login,
  logout,
  getProfile,
  getProfileById,
  getAllProfiles,
  updateProfile,
} = authController;
const { checkLogin } = require("../middleware/middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/allProfiles", getAllProfiles);
router.get("/currentUser", checkLogin, getProfile);
router.get("/profile/:id", getProfileById);
router.put("/updateProfile", checkLogin, updateProfile);

module.exports = router;
