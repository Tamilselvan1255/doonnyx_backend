const express = require("express");
const { registerUser, login } = require("../controllers/userController");
const router = express.Router();

router.post("/user_registration", registerUser);
router.post("/user_login", login);

module.exports = router;
