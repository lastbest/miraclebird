import React from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from "react-device-detect";
import HomeCarousel from "../components/carousel/HomeCarousel";
import WebCarousel from "../components/carousel/HomeWebCarousel";
import Rank from "../components/common/Rank";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()
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
          <div className={styles.footer_camerabutton}>
            <div className={styles.circle}>
              <img
                alt="camera"
                src="/new_camera.png"
                className={styles.footer_camera}
                onClick={() => {
                  navigate("/login");
                }}
              />
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default Home;
