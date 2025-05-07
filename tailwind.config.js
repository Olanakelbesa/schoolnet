    // tailwind.config.js
    module.exports = {
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {
          backgroundImage: {
            'custom-bg-image': "url('../public/images/reset-pwd-bg.png')",
          },
        },
      },
      plugins: [],
    };