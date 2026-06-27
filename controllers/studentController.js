const studentModel = require("../models/studentModel");

const createStudent = async (req, res) => {
  let {
    adm_number,
    first_name,
    last_name,
    dob,
    gender,
    standard,
    section,
    parent_name,
    parent_mobile,
    email,
    address,
    admission_date,
    status,
  } = req.body;

  if (
    !adm_number ||
    !first_name ||
    !last_name ||
    !dob ||
    !gender ||
    !standard ||
    !section ||
    !parent_name ||
    !parent_mobile ||
    !email ||
    !address
  ) {
    return res.status(400).send({ error: "Please fill all required fields!" });
  }
  try {
    const existAdmission = await studentModel.findOne({ adm_number });
    if (existAdmission) {
      return res
        .status(400)
        .send({ error: "Admission number already exists!" });
    }

    const existStudent = await studentModel.findOne({
      first_name,
      last_name,
      parent_name,
    });
    if (existStudent) {
      return res.status(400).send({ error: "Student already exists!" });
    }

    admission_date = admission_date ?? Date.now();
    status = status ?? "active";
    await studentModel.create({
      adm_number,
      first_name,
      last_name,
      dob,
      gender,
      standard,
      section,
      parent_name,
      parent_mobile,
      email,
      address,
      admission_date,
      status,
    });
    return res
      .status(201)
      .send({ message: "Student registered successfully!" });
  } catch (error) {
    console.error("Error while creating student", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const viewStudents = async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  try {
    const skip = (page - 1) * limit;

    const [students, totalResult] = await Promise.all([
      studentModel.find(),
      studentModel.countDocuments(),
    ]);

    if (students.length === 0) {
      return res.status(200).send({ error: "No students found!" });
    }

    const pagination = {
      total: totalResult,
      totalPages: Math.ceil(totalResult / limit),
      perPage: limit,
      currentPage: page,
    };

    return res
      .status(200)
      .send({ message: "Students fetched successful", students, pagination });
  } catch (error) {
    console.error("Error while fetching students", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteStudent = async (req, res) => {
  const { student_id } = req.params;
  try {
    console.log(student_id);
    const existStudent = await studentModel.findOne({ _id: student_id });
    if (!existStudent) {
      return res.status(404).send({ error: "Student not found!" });
    }
    console.log("joi");

    await studentModel.findOneAndDelete({ _id: student_id });
    return res.status(200).send({ message: "Student deleted successful!" });
    if (existStudent) {
      return res.status(400).send({ error: "Student already exists!" });
    }
  } catch (error) {
    console.error("Error while deleting student", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { createStudent, viewStudents, deleteStudent };
