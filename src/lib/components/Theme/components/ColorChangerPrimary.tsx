import { useTheme } from "../ThemeContext";
import ColorPalette from "./ColorPalette";

const ColorChangerPrimary = () => {
  const { theme, changeTheme } = useTheme();

  const handleChange = (e: { target: { value: any } }) => {
    changeTheme({
      name: theme?.name,
      colorVars: {
        primary: e.target.value,
        secondary: theme?.colorVars?.secondary,
      },
    });
  };

  return (
    <div className="p-4">
      <ColorPalette
        variable="primary"
        value={theme?.colorVars?.primary}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorChangerPrimary;
