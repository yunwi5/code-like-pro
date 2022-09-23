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

        const foundImage = await Image.findOne({ user: userId });
        const uploadedResponse = await cloudinary.uploader.upload(inputImage, {
            upload_preset: CLOUDINARY_DIR,
        });

        console.log(uploadedResponse);

        if (foundImage) {
            await cloudinary.uploader.destroy(foundImage.publicId);
            await foundImage.remove();
        }

        const { public_id, url } = uploadedResponse;
        const createdImage = new Image({ publicId: public_id, url, user: userId });
        await createdImage.save();

        res.status(201).json(createdImage);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// DELETE request does not have a body, so use POST request instead to delete the image.
const deleteImageByUrl = async (req, res) => {
    const url = req.body.url;
    const foundImage = await Image.findOne({ url });
    if (!foundImage) return res.status(404).json({ message: 'Image not found.' });
    await foundImage.remove();

    const destroyResult = await cloudinary.uploader.destroy(foundImage.publicId);
    console.log({ destroyResult });
    res.status(200).json(destroyResult);
};

module.exports = { postExerciseImage, postUserImage, deleteImageByUrl };
