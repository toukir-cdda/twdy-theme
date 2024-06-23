import React from "react";

export interface ButtonProps {
  label: "hellow" | "its me";
}
const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500">
      {label}
    </button>
  );
};
export default Button;
