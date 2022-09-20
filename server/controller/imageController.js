const cloudinary = require('../config/cloudinary');
const Image = require('../models/Image');

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

const postUserImage = async (req, res) => {
    const userId = req.user._id;
    try {
        const inputImage = req.body.image;
        if (!inputImage)
            return res.status(404).json({ message: 'Requset body image not found.' });

        const foundImagePromise = Image.findOne({ user: userId });
        const uploadedResponsePromise = cloudinary.uploader.upload(inputImage, {
            upload_preset: CLOUDINARY_DIR,
        });

        const [foundImage, uploadedResponse] = await Promise.all([
            foundImagePromise,
            uploadedResponsePromise,
        ]);
        console.log(uploadedResponse);

        const destroyPromise = cloudinary.uploader.destroy(foundImage.publicId);
        const removePromise = foundImage.remove();

        const { public_id, url } = uploadedResponse;
        const createdImage = new Image({ publicId: public_id, url, user: userId });
        const createPromise = createdImage.save();

        await Promise.all([destroyPromise, removePromise, createPromise]);

        res.status(201).json(createdImage);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { postExerciseImage, postUserImage };
