const jwt = require("jsonwebtoken");
const generateToken = (id, name, email) => {
  const token = jwt.sign(
    { _id: id, name: name, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
  return token;
};

module.exports = generateToken;
