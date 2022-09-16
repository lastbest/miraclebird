import React from "react";
import { Container } from "react-bootstrap";
import styles from './Challenge.module.css'

function Challenge () {
    return (
        <>
        <div className={styles.header}>
            <p>챌린지</p>
            <div className={styles.community}>
                <button onClick={()=>{document.location.href="/challenge/community"}} className={styles.communitybtn}><img alt="community" src="/community.png" className={styles.communityicon}/>커뮤니티</button>
            </div>
        </div>
        <div className={styles.containers}>
            <div className={styles.miraclemorning}>
                <p >미라클모닝</p>
                <img alt="morning" src="/miraclemorning.png" onClick={()=>(document.location='/challenge/morning')}/>
            </div>
            <div className={styles.health}>
                <p>운동</p>
                <img alt="health" src="/health.jpg" onClick={()=>(document.location='/challenge/health')}/>
            </div>
            <div className={styles.study}>
                <p>스터디</p>
                <img alt="study" src="/study.jpg" onClick={()=>(document.location='/challenge/study')}/>
            </div>
        </div>

        </>
    )
};

export default Challenge;