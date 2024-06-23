import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./tailwind.css";
import { ThemeProvider } from "../lib/components/Theme/ThemeContext.tsx";
import ThemeController from "../lib/components/Theme/components/ThemeController.tsx";
import Loader from "../lib/components/Loader/Loader.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider themeLoader={<Loader />}>
      <ThemeController />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
