/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                main: {
                    50: '#e9e9fc',
                    100: '##bebdf5',
                    200: '##9391ee',
                    300: '#6765e7',
                    400: '#5552E4',
                    500: '#3c38e0',
                    600: '#221fc7',
                    700: '#1b189a',
                    800: '#13116e',
                    900: '#0b0a42',
                    1000: '#040316',
                },
            },
        },
    },
    plugins: [],
};
