// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                moveSideways: {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(-10px)'
                    },
                },
            },
            animation: {
                moveSideways: 'moveSideways 1s ease-in-out',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}