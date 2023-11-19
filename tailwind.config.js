/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      '2xl': '1600px',
    },
    colors: {
      transparent: 'transparent',
      white: '#FFF',
      black: '#090302',
      gray: {
        100: '#d3d3d3',
        200: '#c5c5c5',
        300: '#b7b7b7',
        400: '#a9a9a9',
        500: '#8b8b8b',
        600: '#6d6d6d',
        700: '#515151',
        800: '#373737',
        900: '#1f1f1f',
      },
      cyan: {
        100: '#E2F9FE',
        200: '#C6F0FD',
        300: '#A8E2FA',
        400: '#91D2F6',
        500: '#6DBAF0',
        600: '#4F92CE',
        700: '#366EAC',
        800: '#224E8B',
        900: '#143673',
      },
      green: {
        100: '#D1FCD0',
        200: '#A3F9AA',
        300: '#72ED89',
        400: '#4DDB76',
        500: '#1bc45c',
        600: '#13A85B',
        700: '#0D8D57',
        800: '#087150',
        900: '#055E4A',
      },
      blue: {
        100: '#D8EDFF',
        200: '#B1D8FF',
        300: '#8AC0FF',
        400: '#6DAAFF',
        500: '#3d87ff',
        600: '#2C68DB',
        700: '#1E4DB7',
        800: '#133593',
        900: '#0B247A',
      },
      yellow: {
        100: '#FFF4D2',
        200: '#FFE7A6',
        300: '#FFD579',
        400: '#FFC558',
        500: '#ffa921',
        600: '#DB8718',
        700: '#B76910',
        800: '#934E0A',
        900: '#7A3B06',
      },
      red: {
        100: '#FFE6D8',
        200: '#FFC8B2',
        300: '#FFA38B',
        400: '#FF806F',
        500: '#ff463f',
        600: '#DB2E36',
        700: '#B71F33',
        800: '#93142F',
        900: '#7A0C2D',
      },
    },
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        gudea: 'Gudea, sans-serif',
        arimo: 'Arimo, sans-serif'
      },
    }
  },
  plugins: [],
}

