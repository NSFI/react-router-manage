/* eslint-env node */

if (process.env.NODE_ENV === "production") {
  module.exports = require("./umd/ys-router.production.min.js");
} else {
  module.exports = require("./umd/ys-router.development.js");
}
