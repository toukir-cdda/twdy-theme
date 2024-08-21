import { useTheme } from "../lib/components/Theme/ThemeContext";
import ColorChangerPrimary from "../lib/components/Theme/components/ColorChangerPrimary";
import ColorChangerSecondary from "../lib/components/Theme/components/ColorChangerSecondary";

function App() {
  const { addTheme, themeList, toggleTheme, removeTheme } = useTheme();

  return (
    <div className="bg-primary-25 dark:bg-primary-950 h-screen text-secondary-50 ">
      <div className="bg-primary p-1">
        <h1>twdy theme</h1>
      </div>
      <ColorChangerPrimary />
      <ColorChangerSecondary />
      <button
        onClick={() =>
          addTheme({
            name: "theme1",
            colorVars: { primary: "red", secondary: "blue" },
          })
        }
      >
        Add Theme
      </button>
      <div>
        {themeList.map((themeItem, index) => {
          return (
            <button
              key={index}
              className="p-4 relative"
              onClick={() => toggleTheme(themeItem)}
            >
              {themeItem.name}
              <span
                className="absolute cursor-pointer -top-1 text-sm right-0"
                onClick={() => removeTheme(themeItem.name)}
              >
                X
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-5">
        <div className="bg-gray-400 py-5 px2 ">
          shades
          <div className="h-6 w-32 bg-primary-25"> 25</div>
          <div className="h-6 w-32 bg-primary-50">50 </div>
          <div className="h-6 w-32 bg-primary-100">100</div>
          <div className="h-6 w-32 bg-primary-200">200</div>
          <div className="h-6 w-32 bg-primary-300">300</div>
          <div className="h-6 w-32 bg-primary-400">400</div>
          <div className="h-6 w-32 bg-primary-500">500</div>
          <div className="h-6 w-32 bg-primary-600">600</div>
          <div className="h-6 w-32 bg-primary-700">700</div>
          <div className="h-6 w-32 bg-primary-800">800</div>
          <div className="h-6 w-32 bg-primary-900">900</div>
          <div className="h-6 w-32 bg-primary-950">950</div>
        </div>

        <div className="bg-gray-400 py-5 px2">
          shades
          <div className="h-6 w-32 bg-secondary-25"> 25</div>
          <div className="h-6 w-32 bg-secondary-50">50 </div>
          <div className="h-6 w-32 bg-secondary-100">100</div>
          <div className="h-6 w-32 bg-secondary-200">200</div>
          <div className="h-6 w-32 bg-secondary-300">300</div>
          <div className="h-6 w-32 bg-secondary-400">400</div>
          <div className="h-6 w-32 bg-secondary-500">500</div>
          <div className="h-6 w-32 bg-secondary-600">600</div>
          <div className="h-6 w-32 bg-secondary-700">700</div>
          <div className="h-6 w-32 bg-secondary-800">800</div>
          <div className="h-6 w-32 bg-secondary-900">900</div>
          <div className="h-6 w-32 bg-secondary-950">950</div>
        </div>
      </div>
    </div>
  );
}

export default App;
