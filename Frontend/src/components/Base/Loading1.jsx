import React from "react";
import styles from "./Loading1.module.css";
import spinner from "../../assets/icon/Spinner.gif";
import Lottie from "lottie-react";
import heartloading from "../animation/heartloading.json";
export const Loading1 = () => {
  return (
    <div className={styles.background}>
      <Lottie
        animationData={heartloading}
        loop={true}
        className={styles.heart}
      />
      <div className={styles.loadingText}>거래중입니다.</div>
    </div>
  );
};

export default Loading1;
