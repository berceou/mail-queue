module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true, // for details
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
