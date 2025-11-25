import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
