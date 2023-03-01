const jwt = require("jsonwebtoken");
const generateToken = (id, name, email, role, phone, hostelName) => {
  const token = jwt.sign(
    {
      _id: id,
      name: name,
      email: email,
      role: role,
      phone: phone,
      hostelName: hostelName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
  return token;
};

module.exports = generateToken;
