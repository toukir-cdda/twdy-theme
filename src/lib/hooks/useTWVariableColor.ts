import { useState, useLayoutEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import colorShadeGenerator from "../composables/colors";

type TWVariableColorProps = {
  variable: string;
};

function hexToRgba(hex) {
  // Remove the leading # if present
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r, g, b;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error("Invalid hex color code");
  }

  return `${r} ${g} ${b}`;
}

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
  useLayoutEffect(() => {
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
        // console.log(hexToRgba(colors[shade]), "test");
        rootRule.style.setProperty(
          `--${variable}-${shade}`,
          hexToRgba(colors[shade])
        );
      });
    };

    updateColorVariables();
  }, [variableColor, twVariableShades]);

  return [variableColor, setVariableColor];
};

export default useTWVariableColor;
