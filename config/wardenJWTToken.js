const jwt = require("jsonwebtoken");
exports.generateWardenToken = (id, name, email, role, hostelName) => {
  const wardenToken = jwt.sign(
    {
      _id: id,
      name: name,
      email: email,
      role: role,
      hostelName: hostelName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
  return wardenToken;
};
