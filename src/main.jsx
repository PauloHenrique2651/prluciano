import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

// Browser translation (Chrome, Safari) swaps text nodes for its own <font> wrappers. When React later
// updates or removes a text node that was moved, the DOM call throws and React stops updating the page,
// so animations and taps freeze. Making those two calls tolerant keeps the site alive while translated.
if (typeof Node === "function" && Node.prototype) {
  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child);
  };
  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return insertBefore.call(this, node, null);
    return insertBefore.call(this, node, ref);
  };
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
