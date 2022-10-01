import React, { useState, useEffect } from "react";
import styles from "./MypageFeed.module.css";
import Modal from "react-bootstrap/Modal";
import seasonInfo from "../../pages/season.json";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MypageFeed(props) {
  const [challengeData, setChallengeData] = useState("");
  const [challengeMap, setChallengeMap] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    var startdate = seasonInfo[0].startDate + "_00:00:00.000";
    var enddate = seasonInfo[0].endDate + "_23:59:59.000";
    setChallengeMap(props.data);
    // axios({
    //   url: API_BASE_URL + "/verification/heatmap/" + props.userData.userIdx,
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + NOW_ACCESS_TOKEN,
    //   },
    //   params: {
    //     start_date: startdate,
    //     end_date: enddate,
    //   },
    // })
    //   .then((res) => {
    //     setChallengeData(res.data);
    //     console.log('feed',challengeData)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [props.userData]);

  let [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      var item = challengeData[i];
      temp.push(<img src={item.selfie} className={styles.feedImg} />);
    }
    setChallengeMap(temp);
  }, []);
  console.log("map", challengeMap);
  return (
    <>
      <select
        className={styles.selectBox}
        onChange={(e) => setIdx(e.target.value)}>
        {seasonInfo.map((item) => {
          return (
            <option key={item.season} value={item.season}>
              시즌 {item.season}
            </option>
          );
        })}
      </select>
      <div className={styles.feeds}>
        <div className={styles.list}>
          <button className={styles.listbtn} onClick={() => handleShow()}>
            <img src="/list.png" className={styles.listicon}></img>
          </button>
        </div>
        <div className={styles.feedsImg}>
          {challengeMap.length === 0 ? (
            <div className={styles.challengeNow}>
              <div className={styles.gochallengeText}>
                챌린지에 참가해보세요!
              </div>
              <button
                onClick={() => navigate("/challenge")}
                className={styles.gochallenge}>
                참가하기
              </button>
            </div>
          ) : (
            challengeMap[0]
          )}
        </div>
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.modalcontent}>{challengeMap}</div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default MypageFeed;
