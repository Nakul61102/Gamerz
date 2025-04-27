/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark blue
        secondary: '#9333EA', // Purple
        accent: '#F59E0B', // Amber
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//       },
//       animation: {
//         fadeIn: 'fadeIn 1s ease-in-out',
//       },
//     },
//   },
// };

// keyframes: {
//   slideIn: {
//     '0%': { transform: 'translateX(-100%)' },
//     '100%': { transform: 'translateX(0)' },
//   },
// },
// animation: {
//   slideIn: 'slideIn 0.5s ease-in-out',
// },