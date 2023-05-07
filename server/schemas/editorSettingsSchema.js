const yup = require('yup');

const editorSettingsSchema = yup.object({
    theme: yup.string().required('Theme is required'),
    fontSize: yup.number().required('Font size is required'),
    tabSize: yup.number().required('Tab size is required'),
    editorType: yup.string().required('Editor type is required'),
});

module.exports = { editorSettingsSchema };
