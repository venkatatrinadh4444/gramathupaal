/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin';

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    screens:{
      'xm':'320px',
      'sm':'576px',
      'md':'768px',
      'lg':'992px',
      'xl':'1200px',
      'xxl':'1400px'
    },
    extend: {
      colors:{
        'grey-btn':'#1F2937',
        'primary':'#39823E',
        'lightBlack':'#414141',
        'heading':'#4A4A4A',
        'para':'#A4A4A4',
        'background':'#F5F5F5'
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
        dmSans:["var(--font-dmSans)","sans-serif"]
      },
    },
  },
  plugins: [flowbite],
};
