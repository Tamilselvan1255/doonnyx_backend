const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = require("./cors/cors");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", userRoutes);
app.use("/student", studentRoutes);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Project setup done for backend!" });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
