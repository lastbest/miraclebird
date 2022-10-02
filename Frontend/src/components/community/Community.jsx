import React, { useEffect, useState } from "react";
import styles from "./Community.module.css";
import PostMain from "./PostMain";
import { useNavigate } from "react-router-dom";
import { Loading2 } from "../Base/Loading2";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function Community() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [postData, setPostDate] = useState(null);

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
      console.log("mainData", result);
      setPostDate(result);
      setLoading(false);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    mainApi();
  }, []);
  return (
    <>
      {loading ? (
        <Loading2 />
      ) : (
        <>
          <div className={styles.header}>
            <button
              className={styles.backbtn}
              onClick={() => {
                navigate("/");
              }}>
              <img alt="back" src="/back.png" className={styles.backicon} />
            </button>
            <div className={styles.communitytext}>커뮤니티</div>
            <button
              className={styles.createbtn}
              onClick={() => {
                navigate("/community/create");
              }}>
              <img
                alt="pencil"
                src="/pencil.png"
                className={styles.pencilicon}
              />
            </button>
          </div>
          <PostMain postData={postData} />
        </>
      )}
    </>
  );
}

export default Community;
