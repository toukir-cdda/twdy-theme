import { useTheme } from "../ThemeContext";
import ColorPalette from "./ColorPalette";

const ColorChangerSecondary = () => {
  const { theme, changeTheme } = useTheme();

  const handleChange = (e: { target: { value: any } }) => {
    changeTheme({
      name: theme?.name,
      colorVars: {
        primary: theme?.colorVars?.primary,
        secondary: e.target.value,
      },
    });
  };

  return (
    <div className="p-4">
      <ColorPalette
        variable="secondary"
        value={theme?.colorVars?.secondary}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorChangerSecondary;
