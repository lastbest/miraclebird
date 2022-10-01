import React, { useState, useEffect } from "react";
import spot from "../components/map/spot.json";
import styles from "./Landmark.module.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import optionsJSON from "./options.json";
import Modal from "react-bootstrap/Modal";
import { Loading1 } from "../components/Base/Loading1";

function Landmark() {
  const [si, setSi] = useState("지역");
  const [gu, setGu] = useState("구역");
  const [filter, setFilter] = useState("");

  const [nftMap, setNftMap] = useState("");
  const [nftData, setNftData] = useState("");
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(true);

  const [itemMap, setItemMap] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("nftData", nftData);
    const result = [];
    var useritem = [];
    var adminitem = [];
    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      if (gu == "구역" || item.dongCode == gu) {
        if (item.starForce == 1) {
          useritem = item;
          adminitem = item;
        }
        if (item.starForce != 1) {
          useritem = item;
        }

        if (item.starForce == 7) {
          if (useritem.userIdx == 1) {
            item = adminitem;
          } else {
            item = useritem;
          }

          result.push(
            <div className={styles.flip}>
              <div key={i} className={styles.card}>
                <div className={styles.front}>
                  <img
                    src={item.imagePath}
                    className={styles.landmarkImg}></img>
                  <div className={styles.nftTitle}>
                    <div>{item.title} </div>
                    <img
                      src="/star.png"
                      alt="star"
                      className={styles.starIcon}
                    />
                    <div>{item.starForce}</div>
                  </div>

                  <div className={styles.nftOwner}>
                    {item.userIdx == 1 ? (
                      <div className={styles.sellnow}>지금 구매하세요!</div>
                    ) : (
                      <div className={styles.textCt}>
                        <div className={styles.text1}>OWNER BY</div>
                        <div className={styles.name}>{item.userName}</div>
                      </div>
                    )}
                  </div>
                  <div className={styles.priceCt}>
                    <img
                      src="/dollar.png"
                      alt="dollar"
                      className={styles.dollarIcon}
                    />{" "}
                    {item.sellPrice}
                  </div>
                </div>
                <div className={styles.back}>
                  <div className={styles.nftArea}>
                    {item.province} {item.landmarkCity}
                  </div>
                  <div className={styles.nftTitle2}>{item.title}</div>
                  <div className={styles.buttonCt}>
                    <button className={styles.buyBtn} onClick={handleShow}>
                      구매하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    setNftMap(result);
    return () => {
      setLoading(false);
    };
  }, [nftData]);

  useEffect(() => {}, [itemMap]);

  useEffect(() => {
    console.log(gu);
    setLoading(true);
    axios({
      url: API_BASE_URL + "/landmark",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log("mainData", res.data);
        setNftData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    var result = [];

    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      if (gu == "구역" || item.dongCode == gu) {
        result.push(
          <div key={i}>
            <img src={item.imagePath} className={styles.landmarkImg}></img>
            <br />
            {item.title} (+{item.starForce})
            <br />
            소유자 {item.userName}
            <br />
            {item.province} ({item.landmarkCity})
            <br />
          </div>
        );
      }
    }
    setNftMap(result);
  }, [gu]);

  useEffect(() => {
    console.log(si);

    var tempOptions = [];
    var json = [];
    if (si == "지역") {
      json = optionsJSON[0];
    } else if (si == "서울특별시") {
      json = optionsJSON[1];
    } else if (si == "광주광역시") {
      json = optionsJSON[2];
    } else if (si == "경상북도") {
      json = optionsJSON[3];
    } else if (si == "제주특별자치도") {
      json = optionsJSON[4];
    }
    for (var i = 0; i < json.gu.length; i++) {
      var item = json.gu[i];
      tempOptions.push(
        <option key={item.SIG_CD} value={item.SIG_CD}>
          {item.name}
        </option>
      );
    }
    if (si == "지역") {
      setGu("구역");
    }
    setOptions(tempOptions);
  }, [si]);

  return (
    <>
      <div className={styles.selectCt}>
        <select
          className={styles.selectbox1}
          onChange={(e) => {
            setSi(e.target.value);
          }}>
          <option key="0" value="지역">
            지역
          </option>
          <option key="1" value="서울특별시">
            서울특별시
          </option>
          <option key="2" value="광주광역시">
            광주광역시
          </option>
          <option key="3" value="경상북도">
            경상북도
          </option>
          <option key="4" value="제주특별자치도">
            제주특별자치도
          </option>
        </select>
        <select
          className={styles.selectbox2}
          onChange={(e) => {
            setGu(e.target.value);
          }}>
          {options}
        </select>
      </div>
      {loading ? (
        <Loading1 />
      ) : (
        <div className={styles.container}>{nftMap}</div>
      )}

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <div>구매하시겠습니까?</div>
          <div className={styles.modalbtns}>
            <button className={styles.closeBtn} onClick={handleClose}>
              취소
            </button>
            <button className={styles.buyBtn} onClick={handleClose}>
              구매하기
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default Landmark;
