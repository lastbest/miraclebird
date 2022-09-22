import React from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";
import html2canvas from "html2canvas";

function Camera() {
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
      const fileNametemp =
        "img_" +
        new Date().getFullYear() +
        (new Date().getMonth() + 1) +
        new Date().getDate() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        ".png";
      console.log(fileNametemp);
      // this.setState({ fileName: fileNametemp });
      // let formData = new FormData();
      // formData.append("uploadFile", file, fileName);
      // this.setState({ imgUrl: formData });

      // const mimeType = "image/png"; // image/jpeg
      // const realData = canvdata.split(",")[1]; // 이 경우에선 /9j/4AAQSkZJRgABAQAAAQABAAD...
      // const blob = b64toBlob(realData, mimeType);
      // this.setState({ imgUrl: window.URL.createObjectURL(blob) });
      // document.getElementById('myimage').src = window.URL.createObjectURL(blob)

      //시그널링 테스트 요기
      // const mySession = this.state.session;
      // mySession.signal({
      //   data: `${this.state.myUserName},timer`,
      //   to: [],
      //   type: "picture",
      // });
      // ============요기까지

      var photo = document.createElement("img");
      photo.setAttribute("src", canvdata);
      photo.setAttribute("width", 256);
      photo.setAttribute("height", 256);
      document.getElementById("frame").appendChild(photo);
    });
  }

  const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <button onClick={capture}>Capture photo</button>
      <Webcam
        audio={false}
        className={styles.Camera}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      {url && (
        <div id="screenshot_wrap" className={styles.screenshot_wrap}>
          <div className={styles.screenshot}>
            <img src={url} alt="Screenshot" />
          </div>
          <div className={styles.timestamp}>
            <p>2022-09-22 11:35</p>
          </div>
        </div>
      )}
      <button onClick={takepicture}>photo Save</button>
      <div id="frame" className="frame"></div>
    </div>
  );
}

export default Camera;
