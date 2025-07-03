import React from "react";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import { createRoot } from "react-dom/client";
function App() {
  return (
    <>
      <Header />

      <Banner />

      <Footer />
    </>
  );
}
export default App;
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
