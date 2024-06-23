import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover/Popover";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";

const AddTheme = () => {
  const { addTheme } = useTheme();
  const [themeName, setThemeName] = useState("");

  const handleSubmit = () => {
    addTheme({
      name: themeName,
      colorVars: { primary: "#164969", secondary: "#4d3cd3" },
    });
    setThemeName("");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <FaPlusCircle className="text-yellow-200 hover:text-yellow-300 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="flex items-center gap-2 bg-white dark:bg-primary-900 shadow-md rounded-md px-3 py-2">
        <input
          className="py-1 px-2 outline-none  border-b-2 focus:border-primary-500 border-gray-300 bg-transparent"
          id="parentName"
          type="text"
          placeholder="Theme Name"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
        />
        {themeName && (
          <AiFillCheckCircle
            onClick={() => handleSubmit()}
            className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AddTheme;
