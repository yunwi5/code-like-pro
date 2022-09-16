const { Language } = require('../models/enums');

// C++ and Java have to specify its extensions at the end of its filename for correct execution.
function getSourceFilename(language) {
    if (language === Language.CPP) return 'test.cpp';
    if (language === Language.JAVA) return 'Test.java';
    return 'test';
}

// Construct the C++ file format for user code compile & execution.
function getCppFileContent(sourceCode, testCode) {
    return `${sourceCode}
        int main() {
            ${testCode}
            return 0;
        }
    `;
}

// Construct the Java file format for user code compile & execution.
function getJavaFileContent(sourceCode, testCode) {
    return `${sourceCode}
            class Test {
                    public static void main(String[] args) {
                    ${testCode}
                }
            }`;
}

/*
Construct and configure the file for compile/execution for different languages.
Construct the following run_spec object format.
run_spec: {
        language_id: Language,
        sourcefilename: filename,
        sourcecode: code,
    },
*/
function constructLanguageFileSpec(language, sourceCode, testCaseCode) {
    const commonSpec = {
        language_id: language,
        sourcefilename: getSourceFilename(language),
    };

    if (language === Language.NODE_JS || language === Language.PYTHON) {
        return {
            ...commonSpec,
            sourcecode: sourceCode + '\n\n' + testCaseCode,
        };
    } else if (language === Language.CPP) {
        return {
            ...commonSpec,
            sourcecode: getCppFileContent(sourceCode, testCaseCode),
        };
    } else if (language === Language.JAVA) {
        return {
            ...commonSpec,
            sourcecode: getJavaFileContent(sourceCode, testCaseCode),
        };
    }

    // Default run spec configuration.
    return { ...commonSpec, sourceCode: sourceCode + '\n\n' + testCaseCode };
}

module.exports = { getSourceFilename, constructLanguageFileSpec };
