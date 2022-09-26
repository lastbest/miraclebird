import React, { useState } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";
import html2canvas from "html2canvas";
import axios from "axios";

function Camera() {
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState(null);
  const [imgurl, setImgUrl] = useState(undefined);

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
      console.log("file", file)
      formData.append("uploadFile", file, fileName);
      console.log(formData)
      setImgUrl(formData);

      console.log("imgurl", imgurl);
      console.log("imgurl.length", imgurl.length);
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

  function savepicture() {
    axios({
      url: "https://j7c107.p.ssafy.io/image/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        processData: false,
      },
      data: imgurl,
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
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
        <img
          className={styles.back}
          src="src/assets/icon/back_icon.png"
          onClick={() => {
            setUrl(null);
          }}></img>
      ) : (
        <></>
      )}
      <div className={styles.shotDiv}>
        {url ? (
          <div id="screenshot_wrap" className={styles.screenshot_wrap}>
            <div className={styles.screenshot}>
              <img src={url} alt="Screenshot" />
            </div>
            <div className={styles.timestamp}>
              <p>2022-09-22 11:35</p>
            </div>
            <div className={styles.themText}>
              {them === 1 ? "미라클 모닝" : ""}
              {them === 2 ? "운동" : ""}
              {them === 3 ? "스터디" : ""}
            </div>
          </div>
        ) : (
          <Webcam
            audio={false}
            className={styles.Camera}
            screenshotFormat="image/png"
            ref={webcamRef}
            videoConstraints={videoConstraints}
          />
        )}
      </div>

      <div className={styles.btnCt}>
          <button className={`challengeBtn ${them === 1 ? 'active' : ''}`} onClick={()=>(setThem(1))}>미라클모닝</button>
          <button className={`challengeBtn ${them === 2 ? 'active' : ''}`} onClick={()=>(setThem(2))}>운동</button>
          <button className={`reportBtn ${them === 3 ? 'active' : ''}`} onClick={()=>(setThem(3))}>스터디</button>
      </div>

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
              }}></img>
          </div>
        ) : (
          <div>
            <div>
              <img
                className={styles.shot}
                src="/download.png"
                onClick={() => {
                  takepicture();
                  savepicture();
                  
                }}></img>
            </div>
          </div>
        )}
        <div id="frame" className="frame"></div>
      </div>
    </div>
    
    <Modal
          centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
          <Modal.Header className={styles.modalheader} closeButton>
          </Modal.Header>
          <Modal.Body className={styles.modalcontent}>
              챌린지 카테고리를 선택해주세요!
          </Modal.Body>
          <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

    </>
  );
}

export default Camera;
