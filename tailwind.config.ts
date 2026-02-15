import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#038C7F', // Teal
                secondary: '#F2C641', // Gold
                tertiary: {
                    light: '#F2C641',
                    dark: '#000000',
                },
            },
            fontFamily: {
                poppins: ['var(--font-poppins)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
export default config
