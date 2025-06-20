/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        'lightBlack':'#414141'
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
