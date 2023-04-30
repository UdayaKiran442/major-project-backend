const route = require("express").Router();

const {
  registerFaculty,
  loginFaculty,
  addFreeDay,
} = require("../../controllers/faculty");
const { isFacultyAuthenticated } = require("../../middlewares/facultyAuth");

route.post("/new-faculty", registerFaculty);
route.post("/faculty-login", loginFaculty);
route.post("/add-freetime", isFacultyAuthenticated, addFreeDay);

module.exports = route;
