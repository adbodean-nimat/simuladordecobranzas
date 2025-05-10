import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily:{
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                'sea-green': {
                    '50': '#ecfff4',
                    '100': '#d3ffe6',
                    '200': '#aaffce',
                    '300': '#69ffaa',
                    '400': '#21ff7d',
                    '500': '#00f25b',
                    '600': '#00ca48',
                    '700': '#009e3b',
                    '800': '#007a33',
                    '900': '#02652d',
                    '950': '#003916',
                },    
            }
        }
    }
}