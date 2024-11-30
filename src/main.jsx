import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StoreProvider from "./redux/provider/redux-provider.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <App />
      <Toaster richColors position="top-right" />
    </StoreProvider>
  </StrictMode>
);
