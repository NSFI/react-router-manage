/* eslint-env node */

if (process.env.NODE_ENV === "production") {
  module.exports = require("./umd/react-router-manage.production.min.js");
} else {
  module.exports = require("./umd/react-router-manage..development.js");
}
