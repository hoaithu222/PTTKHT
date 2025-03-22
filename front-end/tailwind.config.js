/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {

        primary: {
          DEFAULT: "#2E7D32",
          light: "#4CAF50",
          dark: "#1B5E20",
        },
        secondary: {
          DEFAULT: "#FF8F00",
          light: "#FFA726",
          dark: "#EF6C00",
        },

        background: {
          light: "#F9FBF6",
          dark: "#1C2A1E",
        },

        text: {
          light: "#21401C",
          dark: "#E8F5E9",
        },

        accent: {
          yellow: "#FDD835",
          red: "#E53935",
        },
      },
      backgroundImage: {

        "gradient-green": "linear-gradient(135deg, #2E7D32, #81C784)",
        "gradient-green-yellow": "linear-gradient(135deg, #2E7D32, #FDD835)",
        "gradient-orange-yellow": "linear-gradient(135deg, #FF8F00, #FDD835)",
        "gradient-green-blue": "linear-gradient(135deg, #2E7D32, #4FC3F7)",
      },

      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },

      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};