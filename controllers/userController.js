const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

exports.registerUsers = async (req, res) => {
  const { phoneNumber, password, type } = req.body;

  //check if user already exists.
  let user = await User.findOne({ phoneNumber });
  if (user) {
    return res.status(400).json({ errors: [{ msg: "User already exists with this phone number !" }] });
  }
  //create user obj
  user = new User({ phoneNumber, password, type });
  //generate hash
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  //save user to DB
  await user.save();

  //sign jwt and send a token response
  const payload = {
    user: {
      id: user.id,
    },
  };

  //sign jwt -> change the expiration in 1 hour or more when in production
  jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
