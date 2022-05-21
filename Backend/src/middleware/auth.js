const jwt = require("jsonwebtoken");
const User = require("../db/model/user");

const auth = async function (req, res, next) {
  try {
    // console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");
    // Validate the header
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    // Find the authenticated user
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error(`Please authenticate!`);

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    // console.log(error);
    error.status = 401;
    next(error);
  }
};
module.exports = auth;
