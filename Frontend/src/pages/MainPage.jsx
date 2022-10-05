import React from "react";
import styles from './MainPage.module.css';
import {Fade, Bounce, Slide} from 'react-reveal';

function MainPage () {
    return (
        <div className={styles.Main}>
        <div className={styles.first}>
            <div className={styles.text1}>당신의 습관,</div>
            <div className={styles.text1}>당신의 건강,</div>
            <div className={styles.text1}>당신의 미래를 위해</div>
            <div className={styles.logoimg}>
                <Slide bottom>
                <img alt="detail" src="/logo.png" className={styles.logo} />
                    <img alt="detail" src="/title.png" className={styles.title} />
                </Slide>
            </div>
        </div>
        <div>
        <Fade left>
            <div className={styles.text2_1}>
                01
            </div>
            <div className={styles.text2_2}>
                NFT 랜드마크를 구매해보세요.
            </div>
        </Fade>
        </div>
        <div>
            <img alt="detail" src="/nft2.jpg" className={styles.mainImg} />
        </div>
        </div>
    )
}

export default MainPage;