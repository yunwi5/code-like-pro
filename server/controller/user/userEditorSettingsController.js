const UserEditorSettings = require('../../models/UserEditorSettings');

const getUserEditorSettings = async (req, res) => {
    const userId = req.user._id;
    const userEditorSettings = await UserEditorSettings.findOne({ user: userId });

    if (userEditorSettings != null) {
        res.status(200).json(userEditorSettings);
    } else {
        res.status(404).json({ message: `User ${userId} not found` });
    }
};

const putUserEditorSettings = async (req, res) => {
    const userId = req.user._id;
    const updatedSettings = req.body;

    const existingUserEditorSettings = await UserEditorSettings.findOne({ user: userId });

    if (existingUserEditorSettings != null) {
        const updatedUserEditorSettings = await UserEditorSettings.findOneAndUpdate(
            { user: userId },
            req.body,
            { new: true },
        );

        return res.status(200).json(updatedUserEditorSettings);
    } else {
        const newUserEditorSettings = new UserEditorSettings({
            user: userId,
            ...updatedSettings,
        });
        const createdUserEditorSettings = await newUserEditorSettings.save();

        return res.status(201).json(createdUserEditorSettings);
    }
};

const controller = {
  getUserEditorSettings,
  putUserEditorSettings,
};

module.exports = controller;
