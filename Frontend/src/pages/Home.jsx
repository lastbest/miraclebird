import React from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from 'react-device-detect';
import HomeCarousel from "../components/carousel/HomeCarousel";
import WebCarousel from "../components/carousel/HomeWebCarousel";
import Rank from "../components/common/Rank";

function Home() {
  return (
    <>
    <MobileView>
      <div className="App">
        <HomeCarousel></HomeCarousel>
        <Rank />
      </div>
    </MobileView>
    <BrowserView>
      <div className="App">
        <WebCarousel />
        <Rank />

      </div>
    </BrowserView>
    </>
  );
}

export default Home;
