/**
 * @type {import('prettier').Options}
 */
module.exports = {
  arrowParens: "avoid",
  trailingComma: "none",
  overrides: [
    {
      files: "**/*.md",
      options: {
        printWidth: 1000,
        proseWrap: "never",
        tabWidth: 2
      }
    }
  ]
};
