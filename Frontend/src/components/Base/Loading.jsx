import React from "react";
import styles from "./Loading.module.css";
export const Loading = () => {
  return (
    <div className={styles.background}>
      <div className={styles.loadingText}>잠시만 기다려 주세요.</div>
      <img src="src/assets/icon/Spinner.gif" width="20%" />
    </div>
  );
};

export default Loading;
