const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/unauthorized-error");

// const handleAuthError = (res) => {
//  res
//    .status(UNAUTHORIZED)
//    .send({ message: "Authorization Error from handleAuthError" });
//};

module.exports = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new UnauthorizedError("Invalid format for authorization header"),
    );
  }
  // getting the token
  const token = authorization.replace("Bearer ", "");
  let payload;

  // verifying the token
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new UnauthorizedError("An error occurred while parsing the payload"),
    );
  }

  req.user = payload; // adding the payload to the Request object

  return next(); // passing the request further along
};
