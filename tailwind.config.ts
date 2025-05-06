import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
<<<<<<< HEAD
        fontFamily:{
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
=======
>>>>>>> df1469f0 (Initial commit)
        container: {
            center: true,
        },
        extend: {
            colors: {
                'sea-green': {
<<<<<<< HEAD
<<<<<<< HEAD
                    '50': '#ecfff5',
                    '100': '#d3ffe8',
                    '200': '#aaffd3',
                    '300': '#69ffb2',
                    '400': '#21ff8a',
                    '500': '#00f269',
                    '600': '#00ca53',
                    '700': '#009e44',
                    '800': '#007c3b',
                    '900': '#026533',
                    '950': '#003919',
                },    
=======
                    '50': '#edfff7',
                    '100': '#d6ffed',
                    '200': '#afffdc',
                    '300': '#71ffc2',
                    '400': '#2dfba1',
                    '500': '#02e583',
                    '600': '#00bf69',
                    '700': '#008a4f',
                    '800': '#067546',
                    '900': '#085f3b',
                    '950': '#003620',
                },
>>>>>>> df1469f0 (Initial commit)
=======
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
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
            }
        }
    }
}