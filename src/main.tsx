import "./styles/reset.css";
import "./styles/index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

function main(): void {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found in DOM.");
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

main();
