import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import App from "./App.jsx";
import './i18n';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
