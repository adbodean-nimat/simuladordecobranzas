import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        fontFamily:{
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
        container: {
            center: true,
        },
        extend: {
            colors: {
                'sea-green': {
                    '50': '#ecfff5',
                    '100': '#d3ffe9',
                    '200': '#aaffd5',
                    '300': '#69ffb5',
                    '400': '#21ff8f',
                    '500': '#00f26e',
                    '600': '#00ca57',
                    '700': '#009e47',
                    '800': '#007f3f',
                    '900': '#026535',
                    '950': '#00391b',
                },    
            }
        }
    }
}