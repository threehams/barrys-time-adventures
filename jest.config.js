const nextJest = require("next/jest");
const createJestConfig = nextJest();

module.exports = createJestConfig({
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
  moduleNameMapper: {
    "^@laundry(.*)$": "<rootDir>/libs/$1",
  },
});
