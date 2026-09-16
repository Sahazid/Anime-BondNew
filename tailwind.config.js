/** @type {import('tailwindcss').Config} */
export const theme = {
    extend: {
        animation: {
            'infinite-scroll': 'infinite-scroll 25s linear infinite',
        },
        keyframes: {
            'infinite-scroll': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-100%)' },
            }
        }
    },
};
export const plugins = [];
