import React, { useEffect, useState } from "react";
import styles from "./Community.module.css";
import PostMain from "./PostMain";
import { useNavigate } from "react-router-dom";
import { Loading2 } from "../Base/Loading2";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function Community() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [postData, setPostDate] = useState("");
  const [userData, setUserDate] = useState("");
  const [postDataMap, setPostDateMap] = useState("");

  const mainApi = async () => {
    try {
      console.log("community");
      const response = await fetch(API_BASE_URL + "/post", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      });
      const result = await response.json();
      setPostDate(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const temp1 = [];
    const temp2 = [];
    console.log(postData);

    for (var i = 0; i < postData.length; i++) {
      var item = postData[i];
      if (item.userRole && item.userRole == "ADMIN") {
        temp1.push(item);
      } else {
        temp2.push(postData[i]);
      }
    }
    console.log("mainData", temp1);
    for (var i = temp2.length - 1; i >= 0; i--) {
      temp1.push(temp2[i]);
    }

    setPostDateMap(temp1);
  }, [postData]);

  useEffect(() => {
    setLoading(false);
  }, [postDataMap]);

  useEffect(() => {
    mainApi();
  }, []);
  return (
    <>
      {loading ? (
        <Loading2 />
      ) : (
        <div className={styles.con}>
          <PostMain postData={postDataMap} className={styles.postMain} />
          <div className={styles.footer_camerabutton}>
            <img
              alt="camera"
              src="/src/assets/icon/create_button.png"
              className={styles.footer_camera}
              onClick={() => {
                navigate("/community/create");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Community;
