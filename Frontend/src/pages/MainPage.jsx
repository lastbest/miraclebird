import React from "react";
import styles from './MainPage.module.css';
import { useSpring, animated } from "react-spring";
import Lottie from "lottie-react";
import mancoin from "../components/animation/mancoin.json"
import landmark from "../components/animation/landmark.json"
import reinforce from "../components/animation/reinforce.json"


function MainPage () {
    //천천히 보이기
    const props = useSpring({ opacity: 1, from: { opacity: 0 } ,config: { duration: "2000" },});
    //아래에서 올라오기
    const styless = useSpring({
    from: { transform: "translateY(100%)" },
    to: [
      { transform: "translateY(0%)" },
    ],
    config: { duration: "1500" },
    loop:false
  })
    //왼쪽에서 날아오기
    const leftslide = useSpring({
        from: { transform: "translateX(0%)" },
        to: [
          { transform: "translateX(50%)" },
        ],
        config: { duration: "1500" },
        loop:false
      })

    return (
        <div className={styles.Main}>
        <div className={styles.first}>
            <img alt="detail" src="/landmark_home.png" className={styles.landmark} />
            <div className={styles.test1Ct}>
                <div className={styles.text1}>당신의 습관,</div>
                <div className={styles.text1}>당신의 건강,</div>
                <div className={styles.text1}>당신의 미래를 위해</div>
            </div>
            <animated.div style={props} className={styles.logoimg}>
                <img alt="detail" src="/logo.png" className={styles.logo} />
                <img alt="detail" src="/title.png" className={styles.title} />
            </animated.div>
        </div>

        <div>
            <div className={styles.text2_1}>
                01
            </div>
            <Lottie animationData={mancoin} className={styles.lottie1} />
            <div className={styles.text2_2}>
                챌린지를 통해 MIRA를 모아보세요
            </div>
        </div>
        <div>
        <animated.div style={styless} className={styles.landmarkCt}>
            <img alt="detail" src="/landmark_home.png" className={styles.landmark} />
        </animated.div>
        </div>


    </div>
    )
}

export default MainPage;