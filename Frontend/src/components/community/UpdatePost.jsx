import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function UpdatePost() {
  const [userIdx, setUserIdx] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState({});
  const { postIdx } = useParams();
  const navigate = useNavigate();

  const mainApi = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/post/" + postIdx, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      });
      const result = await response.json();
      console.log("mainData", result);
      setData(result);
      setTitle(result.title);
      setContent(result.content);
    } catch (error) {
      window.alert(error);
    }

    try {
      const response = await fetch(API_BASE_URL + "/auth/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      });
      const result = await response.json();
      console.log("mainData", result);
      setUserIdx(result.information.userIdx);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.backbtn}
          onClick={() => {
            history.back();
          }}>
          <img alt="back" src="/back.png" className={styles.backicon} />
        </button>
      </div>
      <div className={styles.Form}>
        <div className={styles.titleForm}>
          제목
          <input
            className={styles.title}
            type="text"
            placeholder="제목"
            name="title"
            value={title}
            onInput={(e) => {
              setTitle(e.target.value);
            }}></input>
        </div>
        <div className={styles.contentForm}>
          내용
          <textarea
            className={styles.textarea}
            placeholder="내용"
            name="content"
            value={content}
            onInput={(e) => {
              setContent(e.target.value);
            }}></textarea>
        </div>
      </div>
      <div className={styles.btnForm}>
        <button
          className={styles.submitbtn}
          onClick={() => {
            axios({
              url: API_BASE_URL + "/post/" + postIdx,
              method: "put",
              headers: {
                Authorization: "Bearer " + NOW_ACCESS_TOKEN,
              },
              params: {
                // user_idx: user.information.userIdx,/
                user_idx: userIdx,
              },
              data: {
                title: title,
                content: content,
              },
            }).then((res) => {
              console.log(res.data);
            });
            document.location.href = "/community";
          }}>
          수정하기
        </button>
      </div>
    </>
  );
}

export default UpdatePost;
