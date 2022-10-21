/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',
    verbose: true,
    // Longer timeout when running a lot of tests across all sections
    testTimeout: 30000,
    // Include any dir names that you want to ignore for testing.
    // Testing the all the test files take long. In that case, ignore some of the folders for faster testing opartions.
    testPathIgnorePatterns: [
        // 'auth.test.js',
        // 'comment.test.js',
        // 'exercise.test.js',
        // 'showcase.test.js',
        // 'ranking.test.js',
        // 'user*.test.js',
        // 'forumpost.test.js',
    ],
};

module.exports = config;
