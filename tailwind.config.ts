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
                primary: '#4338ca', // Indigo
                secondary: '#f59e0b', // Amber
                tertiary: {
                    light: '#fbbf24',
                    dark: '#0f172a',
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
