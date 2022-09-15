import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Base/Header";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Camera from "./pages/Camera";
import Footer from "./components/Base/Footer";
import Challenge from "./pages/Challenge";
import Community from "./components/community/Community";
import CreatePost from "./components/community/CreatePost";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Header className={styles.Header} />
        <div className={styles.Contents}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Store" element={<Store />}></Route>
            <Route path="/Camera" element={<Camera />}></Route>
            <Route path="/Challenge" element={<Challenge />}></Route>
            <Route path="/Challenge/Community" element={<Community/>}></Route>
            <Route path="/Challenge/Community/Create" element={<CreatePost/>}></Route>
          </Routes>
        </div>
        <Footer className={styles.Footer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
