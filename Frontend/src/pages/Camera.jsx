import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";
import html2canvas from "html2canvas";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./Camera.css";
import { BrowserView, MobileView } from "react-device-detect";

function Camera() {
  const [them, setThem] = useState();
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState(null);
  const [imgurl, setImgUrl] = useState(undefined);
  const [share, setShare] = useState(false)

  const onCheckedElement = (checked) => {
    if (checked) {
        setShare(true)
    } else if (!checked) {
      setShare(false)
    }
};

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function takepicture() {
    const targetvideo = document.getElementById("screenshot_wrap");
    html2canvas(targetvideo).then((xcanvas) => {
      const canvdata = xcanvas.toDataURL("image/png");
      const decodImg = window.atob(canvdata.split(",")[1]);
      let array = [];
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i));
      }

      const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      const fileName = "test.png";
      // "img_" +
      // new Date().getFullYear() +
      // (new Date().getMonth() + 1) +
      // new Date().getDate() +
      // new Date().getHours() +
      // new Date().getMinutes() +
      // new Date().getSeconds() +
      // ".png";
      let formData = new FormData();
      formData.append("uploadFile", file, fileName);
      setImgUrl(formData);
      console.log(formData);
      for (let value of formData.size) {
        console.log(value);
      }

      var photo = document.createElement("img");
      photo.setAttribute("src", canvdata);
      photo.setAttribute("width", 256);
      photo.setAttribute("height", 256);
      document.getElementById("frame").appendChild(photo);
    });
  }

  useEffect(() => {
    takepicture();
  }, []);

  function savepicture() {
    axios({
      url: "https://j7c107.p.ssafy.io/image/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        processData: false,
      },
      data: imgurl,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  return (
    <>
    <div>
      {url != null ? (
          <div className={styles.headerCt}>
            <img
              className={styles.back}
              src="src/assets/icon/back_icon.png"
              onClick={() => {
                setUrl(null);
              }}></img>
            <div className={styles.headerText}>카메라</div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.shotDiv}>
          {url ? (
            <>
            <BrowserView>
            <div id="screenshot_wrap" className={styles.screenshot_wrap2}>
              <div className={styles.screenshot2}>
                <img src={url} alt="Screenshot" />
              </div>
              <div className={styles.watermark2}>MIRACLE BIRD</div>
              <div className={styles.timestamp2}>
                <p>
                  {new Date().getFullYear()}-
                  {("0" + (new Date().getMonth() + 1)).slice(-2)}-
                  {("0" + (new Date().getDate() + 1)).slice(-2) + " "}
                  {("0" + new Date().getHours()).slice(-2)}:
                  {("0" + new Date().getMinutes()).slice(-2)}
                </p>
              </div>
              <div>
                {them === 1 ? (
                  <div className={styles.themText1_2}>#미라클 모닝</div>
                ) : (
                  ""
                )}
                {them === 2 ? (
                  <div className={styles.themText2_2}>#운동</div>
                ) : (
                  ""
                )}
                {them === 3 ? (
                  <div className={styles.themText3_2}>#스터디</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            </BrowserView>
            <MobileView>
            <div id="screenshot_wrap" className={styles.screenshot_wrap}>
              <div className={styles.screenshot}>
                <img src={url} alt="Screenshot" />
              </div>
              <div className={styles.watermark}>MIRACLE BIRD</div>
              <div className={styles.timestamp}>
                <p>
                  {new Date().getFullYear()}-
                  {("0" + (new Date().getMonth() + 1)).slice(-2)}-
                  {("0" + (new Date().getDate() + 1)).slice(-2) + " "}
                  {("0" + new Date().getHours()).slice(-2)}:
                  {("0" + new Date().getMinutes()).slice(-2)}
                </p>
              </div>
              <div>
                {them === 1 ? (
                  <div className={styles.themText1}>#미라클 모닝</div>
                ) : (
                  ""
                )}
                {them === 2 ? (
                  <div className={styles.themText2}>#운동</div>
                ) : (
                  ""
                )}
                {them === 3 ? (
                  <div className={styles.themText3}>#스터디</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            </MobileView>
            </>
          ) : (
            <>
              <div className={styles.headerCt}>
                <img
                  className={styles.backIcon}
                  src="src/assets/icon/back_icon.png"
                  onClick={() => history.back()}></img>
                <div className={styles.headerText}>카메라</div>
              </div>
              <BrowserView>
              <div className={styles.cameraBrowser}>
                  <Webcam
                    audio={false}
                    className={styles.Camera2}
                    screenshotFormat="image/png"
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                  />
              </div>
              </BrowserView>
              <MobileView>
                <Webcam
                  audio={false}
                  className={styles.Camera}
                  screenshotFormat="image/png"
                  ref={webcamRef}
                  videoConstraints={videoConstraints}
                />
              </MobileView>
              <div className={styles.cateText}>카테고리를 선택해주세요.</div>
              <div className={styles.btnCt}>
                <button
                  className={`mmBtn ${them === 1 ? "active1" : ""}`}
                  onClick={() => setThem(1)}>
                  미라클모닝
                </button>
                <button
                  className={`healthBtn ${them === 2 ? "active2" : ""}`}
                  onClick={() => setThem(2)}>
                  운동
                </button>
                <button
                  className={`studyBtn ${them === 3 ? "active3" : ""}`}
                  onClick={() => setThem(3)}>
                  스터디
                </button>
              </div>
            </>
          )}
        </div>
        
        <MobileView>
        <div className={styles.camera_footer}>
          {url == null ? (
            <div>
              <img
                className={styles.shot}
                src="/camera-lens.png"
                onClick={() => {
                  if (them === 0) {
                    handleShow();
                  } else {
                    capture();
                  }
                  setTimeout(() => takepicture(), 10);
                }}></img>
            </div>
          ) : (
            <div>
              <div className={styles.share}>
                공유하시겠습니까?
              <label className={styles.inputBox}>
                <input name="chkbox" type="checkbox" className={styles.boxs} onChange={e => {onCheckedElement(e.target.checked)}}></input><div>공유하기</div>
              </label>
              </div>
              <div>
                <img
                  className={styles.shot}
                  src="/download.png"
                  onClick={() => {
                    savepicture();
                    console.log({share})
                  }}></img>
              </div>
            </div>
          )}
          <div id="frame" className="frame"></div>
        </div>
        </MobileView>

        <BrowserView>
        <div className={styles.camera_footer2}>
          {url == null ? (
            <div>
              <img
                className={styles.shot}
                src="/camera-lens.png"
                onClick={() => {
                  if (them === 0) {
                    handleShow();
                  } else {
                    capture();
                  }
                  setTimeout(() => takepicture(), 10);
                }}></img>
            </div>
          ) : (
            <div>
              <div className={styles.share}>
                공유하시겠습니까?
              <label className={styles.inputBox}>
                <input name="chkbox" type="checkbox" className={styles.boxs} onChange={e => {onCheckedElement(e.target.checked)}}></input><div>공유하기</div>
              </label>
              </div>
              <div>
                <img
                  className={styles.shot}
                  src="/download.png"
                  onClick={() => {
                    savepicture();
                    console.log({share})
                  }}></img>
              </div>
            </div>
          )}
          <div id="frame" className="frame"></div>
        </div>
        </BrowserView>

      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          챌린지 카테고리를 선택해주세요!
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default Camera;
