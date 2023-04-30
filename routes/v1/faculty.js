const route = require("express").Router();

const {
  registerFaculty,
  loginFaculty,
  addFreeDay,
  addFreeTime,
  getFacultyFreeTimings,
  allFaculty,
} = require("../../controllers/faculty");
const { isFacultyAuthenticated } = require("../../middlewares/facultyAuth");

route.post("/new-faculty", registerFaculty);
route.post("/faculty-login", loginFaculty);
route.post("/add-freeday", isFacultyAuthenticated, addFreeDay);
route.post("/add-freetime", isFacultyAuthenticated, addFreeTime);
route.post("/get-freetime", getFacultyFreeTimings);
route.post("/all", allFaculty);

module.exports = route;
