import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();
  return (
    <>
    {/* <div className={styles.footer_camerabutton}>
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
    </div> */}
    <div className={styles.footer}>
      <div className={styles.footer_navbar}>
        <div className={styles.footer_button}>
          <img
            alt="home"
            src="/new_home.png"
            className={styles.footer_home}
            onClick={() => {
              navigate("/");
            }}
          />
          <div className={styles.icontext}>홈</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="store"
            src="/new_earth.png"
            className={styles.footer_store}
            onClick={() => {
              navigate("/store");
            }}
          />
          <div className={styles.icontext}>스토어</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="community"
            src="/new_post.png"
            className={styles.footer_store}
            onClick={() => {
              navigate("/community");
            }}
          />
          <div className={styles.icontext}>커뮤니티</div>
        </div>

        <div className={styles.footer_button}>
          <img
            alt="challenge"
            src="/new_hashtag.png"
            className={styles.footer_challenge}
            onClick={() => {
              navigate("/challenge");
            }}
          />
          <div className={styles.icontext}>챌린지</div>
        </div>
        <div className={styles.footer_button}>
          <img
            alt="mypage"
            src="/new_profile.png"
            className={styles.footer_mypage}
            onClick={() => {
              navigate("/mypage");
            }}
          />
          <div className={styles.icontext}>마이룸</div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Footer;
