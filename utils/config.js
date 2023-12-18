const JWT_SECRET =
  NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-key";

module.exports = { JWT_SECRET };
