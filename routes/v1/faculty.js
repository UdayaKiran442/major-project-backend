const route = require("express").Router();

const {
  registerFaculty,
  loginFaculty,
  addFreeDay,
  addFreeTime,
} = require("../../controllers/faculty");
const { isFacultyAuthenticated } = require("../../middlewares/facultyAuth");

route.post("/new-faculty", registerFaculty);
route.post("/faculty-login", loginFaculty);
route.post("/add-freeday", isFacultyAuthenticated, addFreeDay);
route.post("/add-freetime", isFacultyAuthenticated, addFreeTime);

module.exports = route;
