/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Share Tech Mono"', "monospace"],
            },
            lineHeight: {
                none: "1",
            },
        },
    },
    plugins: [],
};
