const express = require("express");
const router = express.Router();
const { registerUser, getAllUsers } = require("../controllers/userController"); // ✅ path and curly braces

router.post("/register", registerUser);
router.get("/", getAllUsers);

module.exports = router;
