import React from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from 'react-device-detect';
import HomeCarousel from "../components/carousel/HomeCarousel";

function Home() {
  return (
    <>
    <MobileView>
      <div className="App">
        <HomeCarousel></HomeCarousel>
        <div className={styles.content}>The early bird buys the land</div>
      </div>
    </MobileView>
    <BrowserView>
          <div className="App">
        <div className={styles.content}>The early bird buys the land</div>
      </div>
    </BrowserView>
    </>
  );
}

export default Home;
