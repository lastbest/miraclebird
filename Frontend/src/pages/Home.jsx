import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from "react-device-detect";
import HomeCarousel from "../components/carousel/HomeCarousel";
import WebCarousel from "../components/carousel/HomeWebCarousel";
import Rank from "../components/common/Rank";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css"
import HomeChallenge from "../components/common/HomeChallenge";
import HomeNFT from "../components/common/HomeNFT";

function Home() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const [state, setState] = useState(0);


  return (
    <>
      <BrowserView>
        <div className="App">
          <WebCarousel className={styles.carousel} />
          <div className={styles.infoCt}>
            <div className={styles.btnCt}>
              <button className={`homebtn ${state === 0 ? 'homeactive' : ''}`} onClick={() => (setState(0))}>챌린지</button>
              <button className={`homebtn ${state === 1 ? 'homeactive' : ''}`} onClick={() => (setState(1))}>NFT</button>
            </div>
            <div>
              {state === 0 ? <HomeChallenge /> : <HomeNFT />}
            </div>
          </div>
          <Rank />



          {user != null && user.check != "" ? (
            <div className={styles.footer_camerabutton2}>
              <div className={styles.circle2}>
                <img
                  alt="camera"
                  src="/new_camera.png"
                  className={styles.footer_camera2}
                  onClick={() => {
                    navigate("/camera");
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </BrowserView>
      <MobileView>
        <div className="App">
          <WebCarousel className={styles.carousel} />
          <div className={styles.infoCt}>
            <div className={styles.btnCt}>
              <button className={`homebtn ${state === 0 ? 'homeactive' : ''}`} onClick={() => (setState(0))}>챌린지</button>
              <button className={`homebtn ${state === 1 ? 'homeactive' : ''}`} onClick={() => (setState(1))}>NFT</button>
            </div>
            <div>
              {state === 0 ? <HomeChallenge /> : <HomeNFT />}
            </div>
          </div>
          <Rank />


          {user != null && user.check != "" ? (
            <div className={styles.footer_camerabutton}>
              <div className={styles.circle}>
                <img
                  alt="camera"
                  src="/new_camera.png"
                  className={styles.footer_camera}
                  onClick={() => {
                    navigate("/camera");
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </MobileView>
    </>
  );
}

export default Home;
