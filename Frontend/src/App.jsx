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
import PostView from "./components/community/PostView";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Header className={styles.Header} />
        <div className={styles.Contents}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/camera" element={<Camera />}></Route>
            <Route path="/challenge" element={<Challenge />}></Route>
            <Route path="/challenge/community" element={<Community/>}></Route>
            <Route path="/challenge/community/create" element={<CreatePost/>}></Route>
            <Route path='/challenge/community/:no' element={<PostView />}></Route>
          </Routes>
        </div>
        <Footer className={styles.Footer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
