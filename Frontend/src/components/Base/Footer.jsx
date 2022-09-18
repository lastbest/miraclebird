import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className={styles.footer}>
      <div className={styles.footer_navbar}>
        <div className={styles.footer_button}>
          <img
            alt="home"
            src="/footer_home.png"
            className={styles.footer_home}
            onClick={() => {
              navigate("/");
            }}
          />
          <div>home</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="store"
            src="/footer_store.png"
            className={styles.footer_store}
            onClick={() => {
              navigate("/store");
            }}
          />
          <div>store</div>
        </div>
        <div className={styles.footer_camerabutton}>
          <div className={styles.circle}>
            <img
              alt="camera"
              src="/footer_camera.png"
              className={styles.footer_camera}
              onClick={() => {
                navigate("/camera");
              }}
            />
          </div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="challenge"
            src="/footer_challenge.png"
            className={styles.footer_challenge}
            onClick={() => {
              navigate("/challenge");
            }}
          />
          <div className={styles.text_challenge}>challenge</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="mypage"
            src="/footer_mypage.png"
            className={styles.footer_mypage}
            onClick={() => {
              navigate("/");
            }}
          />
          <div className={styles.text_mypage}>mypage</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
