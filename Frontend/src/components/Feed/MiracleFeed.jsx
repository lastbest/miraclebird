import React, { useState, useEffect } from "react";
import styles from "./MiracleFeed.module.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import heartEffect from "../../components/animation/heart.json";

import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";

function MiracleFeed() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState("");
  const [challengeMap, setChallengeMap] = useState("");
  const [cursorData, setCursorData] = useState("");
  const [cursorMap, setCursorMap] = useState("");

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/verification/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(challengeData);
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      var item = challengeData[i];
      if (item.challengeIdx != 1 || !item.share) continue;
      temp.push(
        <div className={styles.feed} key={item.verificationIdx}>
          <img
            src={item.selfie == "string" ? "/miraclemorning.png" : item.selfie}
            alt="mm"
            id={item.verificationIdx}
            className={styles.picture}
            onClick={(e) => {
              setCursorData(e.target.id);
              handleShow();
            }}
          />
        </div>
      );
    }
    setChallengeMap(temp);
  }, [challengeData]);

  useEffect(() => {
    console.log(cursorData);
    axios({
      url: API_BASE_URL + "/verification/" + cursorData,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setCursorMap(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cursorData]);

  useEffect(() => {
    console.log(cursorMap);
  }, [cursorMap]);

  const heartBtn = () => {
    if (like === false) {
      setLoading(true);
      setLike(true);
      setTimeout(() => {
        setLoading(false);
      }, 1300);
    } else {
      setLike(false);
    }
  };

  return (
    <>
      <div className={styles.feedHeader}>
        <button
          className={styles.backbtn}
          onClick={() => navigate("/challenge/morning")}>
          <img alt="back" src="/back.png" className={styles.backicon} /> Miracle
          Morning
        </button>
      </div>
      <div className={styles.feeds}>{challengeMap}</div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          <img
            src={cursorMap.selfie}
            alt="mm"
            className={styles.picture2}
            onDoubleClick={() => heartBtn()}
          />
          {loading ? (
            <div>
              <Lottie
                animationData={heartEffect}
                className={styles.lottie}
                loop={false}
              />
            </div>
          ) : (
            <div></div>
          )}
          <button className={styles.reportbtn}>
            <img alt="siren" src="/siren.png" className={styles.sirenicon} />
            신고하기
          </button>
          <div className={styles.detail}>
            <div>{cursorMap.name}</div>
            <div>
              {cursorMap.challengeIdx == 1
                ? "미라클모닝"
                : cursorMap == 2
                ? "운동"
                : "스터디"}
            </div>
            <div>
              {cursorMap.regtime && cursorMap.regtime[0]}-
              {cursorMap.regtime && cursorMap.regtime[1]}-
              {cursorMap.regtime && cursorMap.regtime[2]}
            </div>
          </div>
          <div>
            <button className={styles.heartbtn} onClick={() => heartBtn()}>
              {like ? (
                <img
                  alt="heart"
                  src="/heartcolor.png"
                  className={styles.heartIcon}
                />
              ) : (
                <img
                  alt="heart"
                  src="/heart.png"
                  className={styles.heartIcon}
                />
              )}{" "}
              좋아요
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default MiracleFeed;
