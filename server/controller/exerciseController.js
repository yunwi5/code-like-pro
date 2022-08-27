const Exercise = require('../models/Exercise');


function makeRequest(bodyData){
    fetch('http://68.183.118.35/jobe/index.php/restapi/runs', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset-utf-8'
        },
        body: JSON.stringify(bodyData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });

}


const postExercise = (req, res) => {
    
    const exercise = new Exercise(req.body.exercise);
    exercise.author = req.user._id;
    
    // Check solutionCode works

    const testCases = exercise.testCases;
    const solutionCode = exercise.solutionCode

    // Iterate through each test case and make request to JOBE server

    testCases.forEach(testCase => {

        // Append test case to solution code and check if output is right

        const test = solutionCode + "\n" + testCase.testcode;

        const body =  {
            run_spec: {language_id: testCase.language_id, sourcefilename: "test", sourcecode:test}};

        const result = makeRequest(body);

        if (result.stdout != testCase.expectedOutput){
            return res.status(400).json(result);
        }

    });

    await exercise.save();
    console.log('new exercise', exercise);

    res.json(exercise);
    
}

const getExercises = (req, res) => {
    // populate author field with author name
    const exercises = await Exercise.find({}).populate('author', 'name');
    res.status(200).json(exercises);
}

const getExerciseByID = (req, res) => {
    // populate author field with author name
    const exercise = await Exercise.findById(req.params.id).populate('author', 'name');
    res.status(200).json(exercise);
}

const updateExercise = (req, res) => {
    // get new exercise and test solution code
    const newExercise = new Exercise(req.body.exercise);
    const testCases = newExercise.testCases;
    const solutionCode = newExercise.solutionCode;

    testCases.forEach(testCase => {
        const test = solutionCode + "\n" + testCase.testcode;

        const body =  {
            run_spec: {language_id: testCase.language_id, sourcefilename: "test", sourcecode:test}};

        const result = makeRequest(body);

        if (result.stdout != testCase.expectedOutput){
            return res.status(400).json(result);
        }
    });

    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, newExercise);
    res.status(201).json(updatedExercise);
}

const deleteExercise = (req, res) => {
    await Exercise.findByIdAndRemove(req.params.id);
    res.status(204);
}


const controller = {
    postExercise,
    getExercises,
    getExerciseByID,
    updateExercise,
    deleteExercise,
};

module.exports = controller;