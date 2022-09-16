import React from "react";
import styles from "./Footer.module.css";

function Footer () {
    return (
        <div className={styles.footer}>
            <hr></hr>
            <div className={styles.footer_navbar}>
                <div className={styles.footer_button}>
                    <img
                    alt="home"
                    src="/footer_home.png"
                    className={styles.footer_home}
                    onClick={()=>{document.location.href="/"}}
                    />
                    <div>home</div>
                </div>
                <div className={styles.footer_button}>
                    <img
                    alt="store"
                    src="/footer_store.png"
                    className={styles.footer_store}
                    onClick={()=>{document.location.href="/store"}}
                    />
                    <div>store</div>
                </div>
                <div className={styles.footer_camerabutton}>
                    <div className={styles.circle}>
                        <img
                        alt="camera"
                        src="/footer_camera.png"
                        className={styles.footer_camera}
                        onClick={()=>{document.location.href="/camera"}}
                        />
                    </div>
                </div>
                <div className={styles.footer_button}>
                    <img
                    alt="challenge"
                    src="/footer_challenge.png"
                    className={styles.footer_challenge}
                    onClick={()=>{document.location.href="/challenge"}}
                    />
                    <div className={styles.text_challenge}>challenge</div>
                </div>
                <div className={styles.footer_button}>
                    <img
                    alt="mypage"
                    src="/footer_mypage.png"
                    className={styles.footer_mypage}
                    onClick={()=>{document.location.href="/"}}
                    />
                    <div className={styles.text_mypage}>mypage</div>
                </div>
            </div>
        </div>
    )
};

export default Footer;