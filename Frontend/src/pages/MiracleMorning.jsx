import React from "react";
import styles from './MiracleMorning.module.css'

function MiracleMorning () {
    return (
        <>
        <button className={styles.backbtn} onClick={()=>(history.back())}><img alt="back" src="/back.png" className={styles.backicon} /></button>
        <div className={styles.mainContainer}>
            <img alt="morning" src="/miraclemorning.png" className={styles.morningimg}/>
            <div className={styles.maintext}>
                <p className={styles.titletext}>미라클모닝</p>
                <p className={styles.subtext}>당신의 아침을 책임져줄 미라클 모닝!</p>
                <p className={styles.subtext}>하루 한 장의 사진으로 당신의 아침을 인증해보세요!</p>
            </div>
            <div classname={styles.maintext}>
                <p className={styles.titletext}>인증사진</p>
                <p className={styles.subtext}>이불정리, 물 한 잔, 시계 등</p>
                <p className={styles.subtext}>자세한 내용은 커뮤니티의 공지사항을 참고해주세요!</p>
            </div>
            <div className={styles.reward}>
                <p>Reward:</p>
                <img alt='coin' src='/coin.png' className={styles.coin}></img>
                <p>300 MIRA</p>
            </div>
            <button className={styles.detailbtn} onClick={()=>(document.location='/challenge/morning/feed')}>둘러보기</button>
        </div>
        </>
    )
}

export default MiracleMorning;