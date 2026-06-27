const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { full_name, email, password, mobile } = req.body;

  if (!full_name || !email || !password || !mobile) {
    return res.status(400).send({ error: "Please fill all required fields!" });
  }
  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).send({ error: "User already exists!" });
    }

    const encrypted = await bcrypt.hash(password, 10);
    await userModel.create({ full_name, email, password: encrypted, mobile });
    return res.status(201).send({ message: "User registred successfully!" });
  } catch (error) {
    console.error("Error while registring admin user", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Please fill all required fields!" });
  }
  try {
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(404).send({ error: "User not found!" });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword) {
      return res.status(400).send({ error: "Incorrect credentials!" });
    }

    const token = await jwt.sign(
      { full_name: existUser.full_name, email },
      process.env.JWT_SECRET,
    );

    return res.status(200).send({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error while login", error);
    res.status(500).send({ error: "Internal server error", error });
  }
};

module.exports = { registerUser, login };
