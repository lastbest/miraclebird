import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Base/Header";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Camera from "./pages/Camera";
import Footer from "./components/Base/Footer";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Store" element={<Store />}></Route>
          <Route path="/Camera" element={<Camera />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
