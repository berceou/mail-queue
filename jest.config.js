module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true, // for details
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
};
