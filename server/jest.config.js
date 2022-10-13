/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',
    verbose: true,
    // Include any dir names that you want to ignore for testing.
    // Testing the all the test files take long. In that case, ignore some of the folders for faster testing opartions.
    testPathIgnorePatterns: ['exercise.test.js'],
};

module.exports = config;
