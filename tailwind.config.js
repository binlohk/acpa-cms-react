// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                72: '18rem',
                84: '21rem',
                96: '24rem',
                108: '27rem',
                120: '30rem',
                132: '33rem',
                144: '36rem',
                156: '39rem',
                168: '42rem',
                180: '45rem',
                192: '48rem',
                204: '51rem',
                228: '54rem',
                240: '57rem',
                252: '60rem',
            },
            keyframes: {
                moveSideways: {
                    '0%': {
                        transform: 'translateX(0)',
                    },
                    '100%': {
                        transform: 'translateX(-10px)',
                    },
                },
            },
            animation: {
                moveSideways: 'moveSideways 1s ease-in-out',
            },
            // backgroundImage: theme => ({
            //     'upload-image': "url('/src/assets/images/upload-solid.png')",
            // })
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
}
