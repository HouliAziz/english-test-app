/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-white': '#FFFFFF',
                'custom-grey': '#D3D3D3',
                'custom-red': '#FF0000',
            },
        },
    },
    plugins: [],
}