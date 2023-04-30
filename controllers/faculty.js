const Faculty = require("../models/faculty");
const FreeTimings = require("../models/freeTimings");

const jwt = require("jsonwebtoken");

const hashPassword = require("../config/hashed_password");
const comparePassword = require("../config/compare_password");

exports.registerFaculty = async (req, res) => {
  try {
    const { name, email, password, school, department, postType, cabinNumber } =
      req.body;
    const faculty = await Faculty.findOne({ email });
    if (faculty) {
      return res.status(400).json({ error: "Faculty already registered" });
    }
    const encryptedPassword = await hashPassword(password);
    const newFaculty = new Faculty({
      name,
      email,
      password: encryptedPassword,
      school,
      department,
      postType,
      cabinNumber,
    });
    await newFaculty.save();
    return res.status(200).json({
      messsage: "Registered succesfully",
      newFaculty,
    });
  } catch (error) {
    return res.status(500).json({ error: error.messsage });
  }
};

exports.loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ error: "Invalid email/password" });
    }
    const isMatch = await comparePassword(password, faculty.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Invalid email/password" });
    }
    const token = jwt.sign(
      {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        school: faculty.school,
        department: faculty.department,
        cabinNumber: faculty.cabinNumber,
        postType: faculty.postType,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      messsage: "Login succesfull",
      faculty,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.messsage });
  }
};

exports.addFreeDay = async (req, res) => {
  try {
    const { day } = req.body;
    const freeDay = await FreeTimings.findOne({
      faculty: req.faculty._id,
      freeDay: day,
    });
    if (freeDay) {
      return res.status(400).json({
        error: "Free day already added!",
      });
    }
    const addFreeDay = new FreeTimings({
      faculty: req.faculty._id,
      freeDay: day,
    });
    await addFreeDay.save();
    return res.status(200).json({
      success: true,
      message: "Free day added",
      addFreeDay,
    });
  } catch (error) {
    return res.status(500).json({ error: error.messsage });
  }
};

exports.addFreeTime = async (req, res) => {
  const { faculty } = req;
  const { freeTimeSlot, freeDay } = req.body;
  const facultyFreeDay = await FreeTimings.findOne({
    faculty: faculty._id,
    freeDay,
  });
  if (!facultyFreeDay) {
    return res.status(404).json({
      success: false,
      error: "Faculty free day/faculty not found",
    });
  }
  facultyFreeDay.freeTimings.push(freeTimeSlot);
  await facultyFreeDay.save();
  return res.status(200).json({
    success: true,
    facultyFreeDay,
  });
};

exports.getFacultyFreeTimings = async (req, res) => {
  try {
    const { facultyId } = req.body;
    const freeTimeSlots = await FreeTimings.find({
      faculty: facultyId,
    }).populate("faculty");
    return res.status(200).json({
      success: true,
      freeTimeSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
