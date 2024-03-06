/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive'], // or other variants
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    // require('flowbite/plugin'),
  ],

}

