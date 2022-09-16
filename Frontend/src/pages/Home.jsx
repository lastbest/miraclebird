import React from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from 'react-device-detect';
import HomeCarousel from "../components/carousel/HomeCarousel";
import WebCarousel from "../components/carousel/HomeWebCarousel";
import Rank from "../components/common/Rank";

function Home() {
  return (
    <>
    <BrowserView>
      <div className="App">
        <WebCarousel className={styles.carousel} />
        <Rank />
      </div>
    </BrowserView>
    <MobileView>
      <div className="App">
        <WebCarousel className={styles.carousel} />
        <Rank />
      </div>
    </MobileView>
  
    </>
  );
}

export default Home;
