const ShowCase = require('../models/ShowCase');

const postShowCase = async(req, res) => {
    const showCaseBody = req.body;
    const showCase = new ShowCase(showCaseBody);
    showCase.user = req.user._id;

    showCase.save()

    res.status(200).json(showCase);
}

const getShowCaseByID = async(req, res) => {
    let showCase;
    try{

        showCase = ShowCase.findById(req.params.id)
            .populate({path: 'user', select: 'name'})
            .populate({path: 'comments', populate: {path: "user", select: "name"}})
    } catch (err) {
        console.log(err.message);
    }
    if (showcase != null){
        res.status(200).json(showCase);
    } else{
        res.status(404).json(`Showcase ${req.params.id} not found`);
    }
};

const deleteShowCase = async(req, res) => {
    let result; // returns deletedObject if the show case with the param id was found.
    try {
        result = await ShowCase.findByIdAndDelete(req.params.id);
    } catch (err) {
        console.log(err.message);
    }

    if (result != null) {
        return res.status(200).send('Delete successful.');
    } else {
        // If there is an error, or the show case was not found.
        res.status(404).send(`ShowCase ${req.params.id} not found`);
    }
};

const getShowCase = async(req, res) => {
    const showCases = ShowCase.find({})
        .populate({path: 'user', select: 'name'})
        .populate({path: 'comments', populate: {path: "user", select: "name"}})
    
    res.status(200).json(showCases);
}

const updateShowCase = async(req, res) => {
    const updatedDetails = req.body;
    const showCase = await ShowCase.findByIdAndUpdate(req.params.id, updatedDetails, { new: true });

    res.status(200).json(showCase);
};

const controller = {
    postShowCase,
    getShowCase,
    getShowCaseByID,
    updateShowCase,
    deleteShowCase,
};

module.exports = controller;