import { Popover, PopoverContent, PopoverTrigger } from "../../Popover/Popover";
import { BiCog } from "react-icons/bi";
import ColorPalette from "./ColorPalette";
import { useTheme } from "../ThemeContext";
import AddTheme from "./AddTheme";
import ContextMenu from "../../ContextMenu/ContextMenu";
import React from "react";

const ThemeController = () => {
  const {
    theme,
    changeTheme,
    themeList,
    toggleTheme,
    removeTheme,
    toggleDarkMode,
  } = useTheme();

  const handleChangePrimary = (e: { target: { value: any } }) => {
    changeTheme({
      name: theme?.name,
      colorVars: {
        primary: e.target.value,
        secondary: theme?.colorVars?.secondary,
      },
    });
  };

  const handleChangeSecondary = (e: { target: { value: any } }) => {
    changeTheme({
      name: theme?.name,
      colorVars: {
        primary: theme?.colorVars?.primary,
        secondary: e.target.value,
      },
    });
  };

  return (
    <Popover
      indicatorArrow
      arrowFill={
        localStorage.getItem("darkMode") === "true"
          ? "var(--primary-800)"
          : "var(--primary-100)"
      }
    >
      <PopoverTrigger className="absolute bottom-4 right-4 shadow-md bg-primary  text-primary-200 cursor-pointer h-12 w-12 rounded-full flex justify-center items-center text-3xl">
        <span className="animate-spin delay-1000">
          <BiCog />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-4 bg-primary-100 dark:bg-primary-800 text-gray-500 shadow-md rounded-md px-3 py-4">
        {/* color palette */}
        <div className="flex items-center gap-2">
          <ColorPalette
            variable="primary"
            value={theme?.colorVars?.primary}
            onChange={handleChangePrimary}
          />

          <ColorPalette
            variable="secondary"
            value={theme?.colorVars?.secondary}
            onChange={handleChangeSecondary}
          />
        </div>

        {/* dark,light,system */}
        <div className="flex items-center gap-2">
          <button
            className={`${
              theme?.mode === "dark" ? "bg-primary-900" : "bg-primary"
            } text-gray-500 px-4 py-2 border  rounded-md`}
            onClick={() => toggleDarkMode("dark")}
          >
            Dark
          </button>
          <button
            className={`${
              theme?.mode === "light" ? "bg-primary-900" : "bg-primary"
            } text-gray-500 px-4 py-2 border  rounded-md`}
            onClick={() => toggleDarkMode("light")}
          >
            Light
          </button>
          <button
            className={`${
              theme?.mode === "system" ? "bg-primary-900" : "bg-primary"
            } text-gray-500 px-4 py-2 border  rounded-md`}
            onClick={() => toggleDarkMode("system")}
          >
            System
          </button>
        </div>
        {/* theme list */}
        <div className="flex  items-center gap-2 ">
          <div className="flex items-center gap-2 flex-wrap max-w-72">
            {themeList?.map((themeItem) => {
              return (
                <ContextMenu
                  key={themeItem.name}
                  indicatorArrow
                  arrowFill={
                    localStorage.getItem("darkMode") === "true"
                      ? "var(--primary-700)"
                      : "var(--primary-200)"
                  }
                  menuItems={[
                    <button
                      className="block w-full rounded-md text-left px-2 py-1 hover:bg-primary-100 dark:hover:bg-primary-800"
                      onClick={() => removeTheme(themeItem.name)}
                    >
                      Remove
                    </button>,
                  ]}
                >
                  <button
                    className="relative h-6 w-6 rounded-full shadow-md border-2 cursor-pointer"
                    onClick={() => toggleTheme(themeItem)}
                    style={{ backgroundColor: themeItem.colorVars.primary }}
                  />
                </ContextMenu>
              );
            })}
          </div>
          {/* add theme */}
          <AddTheme />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeController;
