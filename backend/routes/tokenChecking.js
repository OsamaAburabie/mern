const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/isLoggedIn", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json({ valid: false });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json({ valid: false });
    const user = await User.findById(verified.id);
    if (!user) return res.json({ valid: false });
    return res.json({
      valid: true,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      id: user._id,
    });
  } catch (err) {
    return res.json({ valid: false });
  }
});
// router.get("/", auth, async (req, res) => {
//   const user = await User.findById(req.user);
//   res.json({
//     displayName: user.displayName,
//     email: user.email,
//     role: user.role,
//     id: user._id,
//   });
// });

module.exports = router;
