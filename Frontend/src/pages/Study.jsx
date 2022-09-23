import React from "react";
import styles from './Study.module.css';
import {useNavigate} from "react-router-dom";

function Study () {
    const navigate = useNavigate();

    return (
        <>
        <button className={styles.backbtn} onClick={()=>(navigate("/challenge"))}><img alt="back" src="/back.png" className={styles.backicon} /> Study</button>
        <div className={styles.mainContainer}>
            <img alt="morning" src="/studying.png" className={styles.morningimg}/>
            <div className={styles.maintext}>
                <p className={styles.titletext}>스터디</p>
                <p className={styles.subtext}>당신의 미래를 책임져줄 스터디!</p>
                <p className={styles.subtext}>하루 한 장의 사진으로 당신의 미래를 인증해보세요!</p>
            </div>
            <div className={styles.maintext}>
                <p className={styles.titletext}>인증사진</p>
                <p className={styles.subtext}>문제집, 정리노트, 강의 화면 등</p>
                <p className={styles.subtext}>자세한 내용은 커뮤니티의 공지사항을 참고해주세요!</p>
            </div>
            <div className={styles.reward}>
                <div>Reward:</div>
                <img alt='coin' src='/coin.png' className={styles.coin}></img>
                <div>1 MIRA</div>
            </div>
            <button className={styles.detailbtn} onClick={()=>(navigate('/challenge/study/feed'))}>둘러보기</button>
        </div>
        </>
    )
}

export default Study;