const Exercise = require('../models/Exercise');
const http = require('http');

function makeRequest(data){
    const options = {
        host: '68.183.118.35',
        path: '/jobe/index.php/restapi/runs',
        method: 'POST',
        port: 80,
        headers: {
            'Content-Type': 'application/json; charset-utf-8'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            savedResult = data;
        });

    }).on("error", (err) => {
        console.log("Error: ", err.message);
    });

    req.write(data);
    req.end();

    return savedResult;

}


const postExercise = (req, res) => {
    
    const exercise = new Exercise(req.body.exercise);
    exercise.author = req.user._id;
    
    // Check solutionCode works

    const testCases = exercise.testCases;
    const solutionCode = exercise.solutionCode

    // Iterate through each test case and make request to JOBE server

    testCases.forEach(testCase => {
        const test = solutionCode + "\n" + testCase.testcode;

        const body =  {"run_spec": {"language_id": testCase.language_id, "sourcefilename": "test", "sourcecode":test}};

        const result = makeRequest(body);

        if (result.stdout != testCase.expectedOutput){
            return res.status(400);
        }

    });

    await exercise.save();
    console.log('new exercise', exercise);

    res.json(exercise);
    
}

