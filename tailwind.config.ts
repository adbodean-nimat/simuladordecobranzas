import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "sea-green": {
          "50": "#ecfff5",
          "100": "#d3ffe8",
          "200": "#aaffd3",
          "300": "#69ffb2",
          "400": "#21ff8a",
          "500": "#00f269",
          "600": "#00ca53",
          "700": "#009e44",
          "800": "#007c3b",
          "900": "#026533",
          "950": "#003919",
        },
      },
    },
  },
};
