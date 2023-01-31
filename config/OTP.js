exports.generateOTP = () => {
  var OTP = "";
  for (let i = 0; i < 5; i++) {
    OTP = OTP + Math.floor(Math.random() * 9);
  }
  return OTP;
};
