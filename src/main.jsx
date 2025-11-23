import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const onNotify = (email) => {
  console.log("Notify request for:", email);
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App
      estimatedTime="December 1"
      brandName="Campus Crafts"
      accentColor="#6EE7B7"
      logoSrc="/Gemini_Generated_Image_7js2347js2347js2.png"
      onNotify={onNotify}
    />
  </React.StrictMode>
);