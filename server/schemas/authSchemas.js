const yup = require('yup');

const loginBodySchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(7).required('Password is required'),
});

const signUpBodySchema = yup.object({
    name: yup.string().min(3).required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(6).required('Password is required'),
});

module.exports = { loginBodySchema, signUpBodySchema };
