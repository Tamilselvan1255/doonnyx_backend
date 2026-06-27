const express = require("express");
const {
  createStudent,
  viewStudents,
  deleteStudent,
} = require("../controllers/studentController");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/create_student", authorization, createStudent);
router.get("/all_students", authorization, viewStudents);
router.delete("/delete/:student_id", authorization, deleteStudent);

module.exports = router;
