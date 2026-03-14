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
                primary: '#065f46', // Emerald 800
                secondary: '#10b981', // Emerald 500
                tertiary: {
                    light: '#34d399', // Emerald 400
                    dark: '#0f172a', // Slate 900
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
