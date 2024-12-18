import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                'sea-green': {
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
            }
        }
    }
}