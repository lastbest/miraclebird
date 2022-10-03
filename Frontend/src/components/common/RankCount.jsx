import React, { useEffect, useState } from "react";
import styles from "./RankCount.module.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

import { BrowserView, MobileView } from "react-device-detect";

function RankCount() {
  const [nickname, setNickname] = useState([]);

  const mainApi = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/verification/ranking/", {
        method: "GET",
      });
      const rankingresult = await response.json();
      setNickname(rankingresult);
    } catch (error) {
      window.alert(error);
    }
  };
  useEffect(() => {
    mainApi();
  }, []);

  return (
    <>
      <BrowserView>
        <div className={styles.medalcontainer}>
          <div>
            <img
              src="src/assets/icon/silver.png"
              className={styles.silverImg}></img>
          </div>
          <div>
            <img
              src="src/assets/icon/gold.png"
              className={styles.goldImg}></img>
          </div>
          <div>
            <img
              src="src/assets/icon/bronze.png"
              className={styles.bronzeImg}></img>
          </div>

          <img className={styles.goldImg}></img>
          <img className={styles.silverImg}></img>
          <img className={styles.bronzeImg}></img>
          <div className={styles.silver}>{nickname[1]}</div>

          <div className={styles.gold}>{nickname[0]}</div>
          <div className={styles.bronze}>{nickname[2]}</div>

          <img
            className={styles.rankingImg}
            alt="rank"
            src="src/assets/icon/ranking.png"></img>
        </div>
      </BrowserView>
      <MobileView>
        <div className={styles.medalcontainermobile}>
          <div>
            <img
              src="src/assets/icon/silver.png"
              className={styles.silverImg}></img>
          </div>
          <div>
            <img
              src="src/assets/icon/gold.png"
              className={styles.goldImg}></img>
          </div>
          <div>
            <img
              src="src/assets/icon/bronze.png"
              className={styles.bronzeImg}></img>
          </div>

          <img className={styles.goldImg}></img>
          <img className={styles.silverImg}></img>
          <img className={styles.bronzeImg}></img>
          <div className={styles.silver}>{nickname[1]}</div>

          <div className={styles.gold}>{nickname[0]}</div>
          <div className={styles.bronze}>{nickname[2]}</div>

          <img
            className={styles.rankingImg}
            alt="rank"
            src="src/assets/icon/ranking.png"></img>
        </div>
      </MobileView>
    </>
  );
}

export default RankCount;
