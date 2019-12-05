const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var jwtDecode = require("jwt-decode");
module.exports = function(req, res, next) {
  const token = req.header("Authorization");
  console.log("token", token);
  if (!token) {
    req.user = null;
    next();
  }
  try {
    const decoded = jwtDecode(token);
    req.user = decoded;
    next();
  } catch (ex) {
    //console.log("Exception", ex);
  }
};
