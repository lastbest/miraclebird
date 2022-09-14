import React from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

function Camera() {
  const videoConstraints = {
    width: 1280,
    height: 720,
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
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </div>
  );
}

export default Camera;
