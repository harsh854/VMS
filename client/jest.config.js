const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFiles: ["jest-canvas-mock", "./setupTests"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/!node_modules\\/apollo-server/"
  ],
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "node_modules",
    "authStore.js",
    "themeStore.js",
    "useVideo.hook.js",
    "QRScanner.js",
    "Camera.jsx",
    "FaceRec.jsx",
    "SignInPopUp.jsx"
  ],
  modulePathIgnorePatterns: [
      "__mocks__",
      "cypress"
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
