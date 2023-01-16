/* eslint-env node */

if (process.env.NODE_ENV === "production") {
  module.exports = require("./umd/antd-breadcrumbs.production.min.js");
} else {
  module.exports = require("./umd/antd-breadcrumbs..development.js");
}
