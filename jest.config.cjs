/** @type {import('jest').Config} */
const config = {
  // The environment JSDOM simulates a browser environment in Node.js
  testEnvironment: 'jsdom',

  // Automatically clear mock calls and instances before every test
  clearMocks: true,

  // The path to a module that runs some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./jest.setup.js'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx'],
};

module.exports = config;