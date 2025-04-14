// module.exports = {
//   JWT_SECRET: process.env.JWT_SECRET || "dev-secret-key",
// };

const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = {
  JWT_SECRET,
};
