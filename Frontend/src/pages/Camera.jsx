import React, { useState } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";
import html2canvas from "html2canvas";

function Camera() {
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState(null);
  const [imgurl, setImgUrl] = React.useState(null);

  function takepicture() {
    const targetvideo = document.getElementById("screenshot_wrap");
    html2canvas(targetvideo).then((xcanvas) => {
      const canvdata = xcanvas.toDataURL("image/png");
      const decodImg = atob(canvdata.split(",")[1]);
      let array = [];
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      const fileNametemp = "img_test.png";
      // "img_" +
      // new Date().getFullYear() +
      // (new Date().getMonth() + 1) +
      // new Date().getDate() +
      // new Date().getHours() +
      // new Date().getMinutes() +
      // new Date().getSeconds() +
      // ".png";
      let formData = new FormData();
      formData.append("uploadFile", file, fileNametemp);
      setImgUrl(formData);

      var photo = document.createElement("img");
      photo.setAttribute("src", canvdata);
      photo.setAttribute("width", 256);
      photo.setAttribute("height", 256);
      document.getElementById("frame").appendChild(photo);
    });
  }

  const savepicture = async () => {
    try {
      const response = await fetch("https://j7c107.p.ssafy.io/image/upload", {
        method: "POST",
        headers: {
          rocessData: false,
          "Content-Type": "multipart/form-data",
        },
        data: {
          uploadFile: imgurl,
        },
      });
      const result = await response.json();
      console.log("mainData", result);
    } catch (error) {
      window.alert(error);
    }
  };

  const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    console.log(url);
  }, [webcamRef]);

  return (
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
          </div>
        ) : (
          <Webcam
            audio={false}
            className={styles.Camera}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
            videoConstraints={videoConstraints}
          />
        )}
      </div>

      <div className={styles.camera_footer}>
        {url == null ? (
          <div>
            <img
              className={styles.shot}
              src="src/assets/icon/shot_icon.png"
              onClick={() => {
                capture();
              }}></img>
          </div>
        ) : (
          <div>
            <div>
              <img
                className={styles.shot}
                src="src/assets/icon/save_icon.png"
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
  );
}

export default Camera;
