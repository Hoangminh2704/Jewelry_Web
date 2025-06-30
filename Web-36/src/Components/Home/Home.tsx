import React from "react";
import Header from "../Header/Header";
import Slides from "../Slides/Slides";
import Features from "../Features/Features";
import Categories from "../Categories/Categories";
import Collection from "../Collection/Collection";
import Shipping from "../Shipping/Shipping";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <>
      <Header />
      <Slides />
      <Features />
      <Categories />
      <Collection />
      <Shipping />
    </>
  );
}

export default App;
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
