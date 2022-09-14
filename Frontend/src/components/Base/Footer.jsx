import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <hr className={styles.hr} />
      <div className={styles.footer_navbar}>
        <div className={styles.footer_button}>
          <img
            alt="home"
            src="/footer_home.png"
            className={styles.footer_home}
          />
          <div>home</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="store"
            src="/footer_store.png"
            className={styles.footer_store}
            onClick={() => {
              document.location.href = "/Store";
            }}
          />
          <div>store</div>
        </div>
        <div className={styles.footer_button}>
          <div className={styles.circle}>
            <img
              alt="camera"
              src="/footer_camera.png"
              className={styles.footer_camera}
              onClick={() => {
                document.location.href = "/Camera";
              }}
            />
          </div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="challenge"
            src="/footer_challenge.png"
            className={styles.footer_challenge}
          />
          <div>challenge</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="mypage"
            src="/footer_mypage.png"
            className={styles.footer_mypage}
          />
          <div>mypage</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
