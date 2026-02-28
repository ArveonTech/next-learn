import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  collectCoverage: true,
  modulePaths: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.type.ts",
    "!<rootDir>/.next/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/*config.js",
    "!<rootDir>/src/middlewares/**",
    "!<rootDir>/src/lib/**",
    "!<rootDir>/src/middleware.ts",
    "!<rootDir>/src/pages/api/**",
  ],
};

export default createJestConfig(config);
