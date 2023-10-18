const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization Error" });
};

module.exports = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }
  // getting the token
  const token = authorization.replace("Bearer ", "");
  let payload;

  // verifying the token
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  next(); // passing the request further along
};
