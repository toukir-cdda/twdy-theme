// import { useState, useEffect } from "react";
// import resolveConfig from "tailwindcss/resolveConfig";
// import tailwindConfig from "../../../tailwind.config.js";

// type TWVariableColorProps = {
//   variable: string;
// };

// const useTWVariableColor = (props: TWVariableColorProps) => {
//   const [variableColor, setVariableColor] = useState("#000000");
//   const fullConfig = resolveConfig(tailwindConfig);

//   const { variable } = props || {};
//   if (!variable) {
//     console.error(
//       `Variable not passed as props. Please pass props like useTWVariableColor({ variable: 'primary' })`
//     );
//     return [variableColor, setVariableColor];
//   } else if (!fullConfig.theme.colors[variable]) {
//     console.error(
//       `Variable ${variable} not found in the theme colors of tailwind.config.js, please add it to the theme colors.`
//     );
//     return [variableColor, setVariableColor];
//   }

//   const twVariableShades = fullConfig.theme.colors[variable];
//   useEffect(() => {
//     const styleSheet = document.styleSheets[0];

//     const updateColorVariables = () => {
//       let rootRule = styleSheet.cssRules[0] as CSSStyleRule;
//       if (!rootRule || rootRule.selectorText !== ":root") {
//         styleSheet.insertRule(":root {}", 0);
//         rootRule = styleSheet.cssRules[0] as CSSStyleRule;
//       }

//       const [h, s, l] = hexToHSL(variableColor);

//       Object.keys(twVariableShades).forEach((shade) => {
//         // const adjustedLightness = adjustLightness(l, shade);
//         // const shadeValue = hslToHex(h, s, adjustedLightness);
//         if (shade === "light") {
//           const shadeValue = hslToHex(h, s, adjustLightness(l, "50"));
//           rootRule.style.setProperty(`--${variable}-${shade}`, shadeValue);
//         } else if (shade === "dark") {
//           const shadeValue = hslToHex(h, s, adjustLightness(l, "dark"));
//           rootRule.style.setProperty(`--${variable}-${shade}`, shadeValue);
//         } else {
//           const shadeValue = hslToHex(h, s, adjustLightness(l, shade));
//           rootRule.style.setProperty(`--${variable}-${shade}`, shadeValue);
//         }
//         // rootRule.style.setProperty(`--${variable}-${shade}`, shadeValue);
//       });

//       // Set the base variable to the 500 shade (original color)
//       rootRule.style.setProperty(`--${variable}`, variableColor);
//     };

//     updateColorVariables();
//   }, [variableColor, twVariableShades]);

//   return [variableColor, setVariableColor];
// };
// const adjustLightness = (l: number, shade: string) => {
//   const shadeAdjustments = {
//     "25": +35,
//     "50": +30,
//     "100": +25,
//     "200": +20,
//     "300": +15,
//     "400": +7.5,
//     "500": 0, // No adjustment for base color
//     "600": -7.5,
//     "700": -15,
//     "800": -22.5,
//     "900": -30,
//     "950": -35,
//     dark: -40,
//     light: +30,
//   } as Record<string, number>;

//   const adjustment = shadeAdjustments[shade] || 0;
//   return Math.max(0, Math.min(100, l + adjustment)); // Ensure lightness stays within 0-100 range
// };

// export default useTWVariableColor;

// function hexToHSL(hex: string) {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   if (!result || result.length < 4) return [0, 0, 0];

//   let r = parseInt(result[1], 16);
//   let g = parseInt(result[2], 16);
//   let b = parseInt(result[3], 16);

//   r /= 255;
//   g /= 255;
//   b /= 255;
//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   let h = 0;
//   let s = 0;
//   let l = (max + min) / 2;

//   if (max !== min) {
//     const d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//     switch (max) {
//       case r:
//         h = (g - b) / d + (g < b ? 6 : 0);
//         break;
//       case g:
//         h = (b - r) / d + 2;
//         break;
//       case b:
//         h = (r - g) / d + 4;
//         break;
//     }
//     h /= 6;
//   }
//   return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
// }

// function hslToHex(h: number, s: number, l: number) {
//   h /= 360;
//   s /= 100;
//   l /= 100;
//   let r, g, b;
//   if (s === 0) {
//     r = g = b = l;
//   } else {
//     const hue2rgb = (p: number, q: number, t: number) => {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     };
//     const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     const p = 2 * l - q;
//     r = hue2rgb(p, q, h + 1 / 3);
//     g = hue2rgb(p, q, h);
//     b = hue2rgb(p, q, h - 1 / 3);
//   }
//   const toHex = (x: number) => {
//     const hex = Math.round(x * 255).toString(16);
//     return hex.length === 1 ? "0" + hex : hex;
//   };
//   return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
// }

import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import colorShadeGenerator from "../composables/colors";

type TWVariableColorProps = {
  variable: string;
};

const useTWVariableColor = (props: TWVariableColorProps) => {
  const [variableColor, setVariableColor] = useState("#000000");
  const fullConfig = resolveConfig(tailwindConfig);

  const { variable } = props || {};
  if (!variable) {
    console.error(
      `Variable not passed as props. Please pass props like useTWVariableColor({ variable: 'primary' })`
    );
    return [variableColor, setVariableColor];
  } else if (!fullConfig.theme.colors[variable]) {
    console.error(
      `Variable ${variable} not found in the theme colors of tailwind.config.js, please add it to the theme colors.`
    );
    return [variableColor, setVariableColor];
  }

  const twVariableShades = fullConfig.theme.colors[variable];
  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    const updateColorVariables = () => {
      let rootRule = styleSheet.cssRules[0] as CSSStyleRule;
      if (!rootRule || rootRule.selectorText !== ":root") {
        styleSheet.insertRule(":root {}", 0);
        rootRule = styleSheet.cssRules[0] as CSSStyleRule;
      }

      const palette = colorShadeGenerator(variableColor);
      const { name, colors } = palette || {};

      Object.keys(colors).forEach((shade) => {
        rootRule.style.setProperty(`--${variable}-${shade}`, colors[shade]);
      });
    };

    updateColorVariables();
  }, [variableColor, twVariableShades]);

  return [variableColor, setVariableColor];
};

export default useTWVariableColor;
