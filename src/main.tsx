import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { stripStaticHeadTags } from "./components/HelmetContainer";
import "./index.css";
import "./App.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root was not found in index.html");
}

// The build-time <head> keeps crawlers happy; in the browser react-helmet-async
// owns those tags, so drop the static copies first to avoid duplicates.
stripStaticHeadTags();

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
