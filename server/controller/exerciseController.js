const Exercise = require('../models/Exercise');
const ensureAuthenticated = require('../middleware/auth')
const http = require('http');

function makeRequest(data){
    const options = {
        host: '68.183.118.35',
        path: '/jobe/index.php/restapi',
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
            savedResult = JSON.parse(data);
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

        req.write(data);
        req.end();
        executeHttp

    });

    await exercise.save();
    console.log('new exercise', exercise);

    res.json(exercise);
    
}

