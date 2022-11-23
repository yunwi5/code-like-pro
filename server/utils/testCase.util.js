const isSameTest = (test1, test2) => {
    return test1.code === test2.code && test1.expectedOutput === test2.expectedOutput;
};

const filterDuplicatedTests = (tests) => {
    const nonDuplicatedTests = [];

    tests.forEach((newTest) => {
        const sameTest = nonDuplicatedTests.find((t) => isSameTest(t, newTest));
        if (sameTest == null) nonDuplicatedTests.push(newTest);
    });

    return nonDuplicatedTests;
};

module.exports = { filterDuplicatedTests };
