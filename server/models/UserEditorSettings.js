const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserEditorSettingsSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    theme: { type: String, default: 'light' },
    fontSize: { type: Number, default: 12 },
    tabSize: { type: Number, default: 4 },
    editorType: { type: String, default: 'default' },
});

const UserEditorSettings = mongoose.model('UserEditorSettings', UserEditorSettingsSchema);

module.exports = UserEditorSettings;
