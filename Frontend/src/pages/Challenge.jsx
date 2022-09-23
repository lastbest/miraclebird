import React from "react";
import styles from "./Challenge.module.css";
import {useNavigate} from 'react-router-dom';


function Challenge() {

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.challengeCt}>
          <img src="/challengehashtag.png" alt="hashtag" className={styles.hashtagicon}/>
          <div>챌린지</div>
        </div>
        <button className={styles.deposit} onClick={() => (navigate("/challenge/deposit"))}> 
          <img src="/deposit.png" alt="deposit" className={styles.hashtagicon}/>
          보증금
        </button>
      </div>
      <div className={styles.containers}>
        <div className={styles.miraclemorning}>
          <img
            alt="morning"
            src="/morning.png"
            className={styles.morningicon}
          />
          <div className={styles.morningtext}>Miracle Morning</div>
          <div className={styles.morningdetail}>
            미라클 모닝은 오전 4시부터 7시까지만 인증가능합니다.
          </div>
          <button onClick={() => (navigate("/challenge/morning"))} className={styles.morningsearchbtn}>알아보기</button>
        </div>
        <div className={styles.health}>
          <img
              alt="health"
              src="/exercise.png"
              className={styles.healthicon}
            />
            <div className={styles.healthtext}>Exercising</div>
            <div className={styles.healthdetail}>
              운동은 하루 한 번 인증가능합니다.
            </div>
            <button onClick={() => (navigate("/challenge/health"))} className={styles.healthsearchbtn}>알아보기</button>
          </div>
        <div className={styles.study}>
          <img
              alt="study"
              src="/studying.png"
              className={styles.studyicon}
            />
            <div className={styles.studytext}>Study</div>
            <div className={styles.studydetail}>
              스터디는 하루 한 번 인증가능합니다.
            </div>
            <button onClick={() => (navigate("/challenge/study"))} className={styles.studysearchbtn}>알아보기</button>
        </div>
        

      </div>

      <div className={styles.footer_camerabutton}>
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
      </div>
    </>
  );
}

export default Challenge;
