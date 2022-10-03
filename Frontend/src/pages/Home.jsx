import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from "react-device-detect";
import WebCarousel from "../components/carousel/HomeWebCarousel";
import Rank from "../components/common/Rank";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";
import HomeChallenge from "../components/common/HomeChallenge";
import HomeNFT from "../components/common/HomeNFT";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import Loading2 from "../components/Base/Loading2";

function Home() {
  const user = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [challengeImg, setChallengeImg] = useState("");
  const [challengeImgMap, setChallengeImgMap] = useState("");

  const [state, setState] = useState(0);

  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    axios({
      url: API_BASE_URL + "/verification/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setChallengeImg(res.data);
        // console.log('img', challengeImg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setChallengeImgMap(challengeImgMap);
    setLoading(false);
  }, [challengeImg]);

  return (
    <>
      {loading ? (
        <>
          <Loading2 />
        </>
      ) : (
        <>
          <BrowserView>
            <div className="App">
              <div className={styles.infoCt}>
                <div className={styles.btnCt}>
                  <button
                    className={`homebtn ${state === 0 ? "homeactive" : ""}`}
                    onClick={() => setState(0)}>
                    챌린지
                  </button>
                  <button
                    className={`homebtn ${state === 1 ? "homeactive" : ""}`}
                    onClick={() => setState(1)}>
                    NFT
                  </button>
                </div>
                <div>{state === 0 ? <HomeChallenge /> : <HomeNFT />}</div>
              </div>
              <Rank />
              <WebCarousel className={styles.carousel} />
              {user != null && user.check != "" ? (
                <div className={styles.footer_camerabutton2}>
                  <img
                    alt="camera"
                    src="/src/assets/icon/camera_button.png"
                    className={styles.footer_camera2}
                    onClick={() => {
                      navigate("/camera");
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </BrowserView>
          <MobileView>
            <div className="App">
              <div className={styles.infoCt}>
                <div className={styles.btnCt}>
                  <button
                    className={`homebtn ${state === 0 ? "homeactive" : ""}`}
                    onClick={() => setState(0)}>
                    챌린지
                  </button>
                  <button
                    className={`homebtn ${state === 1 ? "homeactive" : ""}`}
                    onClick={() => setState(1)}>
                    NFT
                  </button>
                </div>
                <div className={styles.imgSlice}>
                  {state === 0 ? <HomeChallenge /> : <HomeNFT />}
                </div>
              </div>
              <Rank />
              <WebCarousel
                className={styles.carousel}
                challengeMap={challengeImg}
              />
              {user != null && user.check != "" ? (
                <div className={styles.footer_camerabutton2}>
                  <img
                    alt="camera"
                    src="/src/assets/icon/camera_button.png"
                    className={styles.footer_camera2}
                    onClick={() => {
                      navigate("/camera");
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </MobileView>
        </>
      )}
    </>
  );
}

export default Home;
