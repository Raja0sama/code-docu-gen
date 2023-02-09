import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./hooks/useTheme";
import { inject } from "@vercel/analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));
inject();

root.render(
  <React.StrictMode>
    <ThemeProvider value={"dark"}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
