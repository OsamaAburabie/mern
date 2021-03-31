const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.user_register = async function (req, res) {
  try {
    //destructuring the req body
    const { email, password, passwordCheck, displayName } = req.body;

    //Validation
    if (!email || !password || !passwordCheck || !displayName)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password must be at least 5 characters long" });

    if (password != passwordCheck)
      return res.status(400).json({ msg: "The passwords should match" });

    if (displayName.length < 3)
      return res
        .status(400)
        .json({ msg: "The display name must be at least 3 characters long" });

    //check for existing user with the same email
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with the same email already exists" });
    //hashing the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //saving the user in the database
    const newUser = await User({
      email,
      password: passwordHash,
      displayName,
    });
    const user = await newUser.save();

    //login the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.user_login = async function (req, res) {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    //check if the user exists
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    //comparing the hashed password with the entered one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(403).json({ msg: "Wrong Email or Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.admin_register = async function (req, res) {
  try {
    const checkuser = await User.findById(req.user);
    //checking if this user is an admin
    if (checkuser.role != "admin")
      return res.status(400).json({ msg: "Unauthorized" });
    //destructuring the req body
    const { email, password, passwordCheck, displayName } = req.body;

    //Validation
    if (!email || !password || !passwordCheck || !displayName)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password must be at least 5 characters long" });

    if (password != passwordCheck)
      return res.status(400).json({ msg: "The passwords should match" });

    if (displayName.length < 3)
      return res
        .status(400)
        .json({ msg: "The display name must be at least 3 characters long" });
    //check for existing user with the same email
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with the same email already exists" });
    //hashing the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //saving the user in the database
    const newUser = await User({
      email,
      password: passwordHash,
      displayName,
      role: "admin",
    });
    const user = await newUser.save();

    //login the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// exports.admin_login = async function (req, res) {
//   try {
//     const { email, password } = req.body;
//     //validation
//     if (!email || !password)
//       return res.status(400).json({ msg: "Not all fields have been entered" });
//     //check if the user exists
//     const user = await User.findOne({ email: email });
//     if (!user)
//       return res
//         .status(400)
//         .json({ msg: "No account with this email has been registered" });
//     //checking if this user is an admin
//     if (user.role != "admin")
//       return res.status(400).json({ msg: "Wrong Email or Password" });
//     //comparing the hashed password with the entered one
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(403).json({ msg: "Wrong Email or Password" });
//     //set the token with the user id
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         displayName: user.displayName,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.delete_user_account = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });
    const { password } = req.body;
    if (!password) return res.status(400).json({ msg: "invalid password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid password" });
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
