import React, { useEffect, useState } from "react";
import { getPostByNo } from "./PostData";
import styles from "./PostView.module.css";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { useNavigate } from "react-router-dom";
import profile_default from "../../assets/icon/profile_default.jpg";

const PostView = () => {
  const [userIdx, setUserIdx] = useState("");
  const [data, setData] = useState({});
  const { postIdx } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    mainApi();
  }, []);
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className={styles.backbtn}
        onClick={() => {
          navigate("/community")
        }}>
        <img alt="back" src="/back.png" className={styles.backicon} />
      </button>
      <div className={styles.post_view_wrapper}>
        {data ? (
          <>
            <div className={styles.postTitle}>{data.title}</div>
            <div className={styles.postInfo}>
              <div className={styles.postInfoDate}>
                {data.createDate} 조회수 {data.hit}
              </div>
              <div className={styles.postInfoSub}>
                <div className={styles.postInfoName}>
                  <img alt="profile" src={profile_default} />
                  {data.userIdx}
                </div>
                {data.userIdx == userIdx ? (
                  <div>
                    <Link
                      to={`/community/update/${data.postIdx}`}
                      className={styles.titletext}>
                      <button className={styles.updatebtn}>수정</button>
                    </Link>
                    <button
                      className={styles.deletebtn}
                      onClick={() => handleShow()}>
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.postContent}>
              <div>{data.content}</div>
            </div>
            <div className={styles.postComment}>
              <div>
                <img
                  src="/chat.png"
                  alt="comment"
                  className={styles.commenticon}
                />
                댓글
              </div>
            </div>
          </>
        ) : (
          "해당 게시글을 찾을 수 없습니다."
        )}
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          삭제하시겠습니까?
          <div className={styles.btnCt}>
            <button
              className={styles.deletebackbtn}
              onClick={() => handleClose()}>
              돌아가기
            </button>
            <button
              className={styles.deletedeletebtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/post/" + data.postIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                  params: {
                    // user_idx: user.information.userIdx,/
                    user_idx: userIdx,
                  },
                }).then((res) => {
                  console.log(res.data);
                  navigate("/community");
                });
              }}>
              삭제하기
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostView;
