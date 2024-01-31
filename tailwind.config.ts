import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-maitree)", "var(--font-outfit)"]
      },
      height: {
        screen: '100dvh',
        "min-h-screen": "100dvh"
      },
      colors: {
        "primary": "#F5F5F5",
        "primary-highlight": "#fafafa",
        "secondary": "#282B27",
        "secondary-highlight": "#3C403A",
        "success": "#9fde1a",
        "caution": "#e8af36",
        "danger": "#e2592e",
        "info": "#046fd1",
        "indigo": "#1b3386",
        "highlight": "#5B8e7d",
        "": "",
        "": "",
        "": "",
      }
    },
  },
  plugins: [],
}
export default config
