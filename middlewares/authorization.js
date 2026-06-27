const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).send({ error: "Invalid token!" });
  }
  try {
    const token = authHeader.split(" ")[1];

    const validToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) {
      return res.status(400).send({ error: "Invalid user!" });
    }

    req.user = validToken;
    next();
  } catch (error) {
    console.error("Error while authorizing user", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = authorization;
