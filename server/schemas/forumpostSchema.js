const yup = require('yup');

const forumpostBodySchema = yup.object({
    name: yup.string().min(2).required('Forum post name is required'),
    category: yup.string().required('Category is required'),
    tags: yup.array(),
    postType: yup.string().required("Forum oost type is required"),
    content: yup.string().min(3).required("Forum post content is required"),
});

module.exports = { forumpostBodySchema };
