const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.SignUp = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashPassword,
    });

    req.session.user = user;
    return res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect User name or Password",
      });
    }

    req.session.user = user;

    return res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "failed",
    });
  }
};
