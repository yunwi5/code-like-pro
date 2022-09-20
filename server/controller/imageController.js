const cloudinary = require('../config/cloudinary');

const CLOUDINARY_DIR = 'CodeLikePro';

const postExerciseImage = async (req, res) => {
    try {
        const image = req.body.image;
        if (!image) return res.status(404).json({ message: 'Requset body image not found.' });

        const uploadedResponse = await cloudinary.uploader.upload(image, {
            upload_preset: CLOUDINARY_DIR,
        });
        console.log(uploadedResponse);
        res.status(201).json(uploadedResponse);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const postUserImage = async (req, res) => {};

module.exports = { postExerciseImage, postUserImage };
