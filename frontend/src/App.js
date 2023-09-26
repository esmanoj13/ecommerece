import Header from "./Component/Header/Header.js";
import Footer from "./Component/Footer/Footer.js";
import Home from "./Component/Home/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppiens", "Droid Serif"],
      },
    });
  });
  return (
    <BrowserRouter>
      <Header />
      <Routes>       
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
