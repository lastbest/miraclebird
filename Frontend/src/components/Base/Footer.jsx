import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import { getCurrentUser } from "../../util/APIUtils";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../store/user";
import { selectArea } from "../../store/area";

function Footer() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    loadCurrentlyLoggedInUser();

    console.log(localStorage.getItem("accessToken"));
  }, []);
  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        dispatch(login(response));
      })
      .catch((error) => {
        if (location.pathname != "/") {
          handleShow();
        }
      });
  }
  console.log(user);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* user != null && user.check != ""*/}
      {true ? (
        <>
          <div className={styles.footer}>
            <div className={styles.footer_navbar}>
              <div className={styles.footer_button}>
                <img
                  alt="home"
                  src="/new_home.png"
                  className={styles.footer_home}
                  onClick={() => {
                    dispatch(
                      selectArea({
                        name: "korea",
                        SIG_CD: "",
                      })
                    );
                    navigate("/");
                  }}
                />
                <div className={styles.icontext}>홈</div>
              </div>
              <div className={styles.footer_button}>
                <img
                  alt="store"
                  src="/new_earth.png"
                  className={styles.footer_store}
                  onClick={() => {
                    dispatch(
                      selectArea({
                        name: "",
                        SIG_CD: "",
                      })
                    );
                    navigate("/store");
                  }}
                />
                <div className={styles.icontext}>스토어</div>
              </div>
              <div className={styles.footer_button}>
                <img
                  alt="community"
                  src="/new_post.png"
                  className={styles.footer_store}
                  onClick={() => {
                    dispatch(
                      selectArea({
                        name: "",
                        SIG_CD: "",
                      })
                    );
                    navigate("/community");
                  }}
                />
                <div className={styles.icontext}>커뮤니티</div>
              </div>

              <div className={styles.footer_button}>
                <img
                  alt="challenge"
                  src="/new_hashtag.png"
                  className={styles.footer_challenge}
                  onClick={() => {
                    dispatch(
                      selectArea({
                        name: "",
                        SIG_CD: "",
                      })
                    );
                    navigate("/challenge");
                  }}
                />
                <div className={styles.icontext}>챌린지</div>
              </div>
              <div className={styles.footer_button}>
                <img
                  alt="mypage"
                  src="/new_profile.png"
                  className={styles.footer_mypage}
                  onClick={() => {
                    dispatch(
                      selectArea({
                        name: "",
                        SIG_CD: "",
                      })
                    );
                    navigate("/mypage");
                  }}
                />
                <div className={styles.icontext}>마이룸</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.footer}>
            <div className={styles.footer_navbar}>
              <div className={styles.footer_button}>
                <img
                  alt="home"
                  src="/new_home.png"
                  className={styles.footer_home}
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <div className={styles.icontext}>홈</div>
              </div>
              <div className={styles.footer_button}>
                <img
                  alt="store"
                  src="/new_earth.png"
                  className={styles.footer_store}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <div className={styles.icontext}>스토어</div>
              </div>
              <div className={styles.footer_button}>
                <img
                  alt="community"
                  src="/new_post.png"
                  className={styles.footer_store}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <div className={styles.icontext}>커뮤니티</div>
              </div>

              <div className={styles.footer_button}>
                <img
                  alt="challenge"
                  src="/new_hashtag.png"
                  className={styles.footer_challenge}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <div className={styles.icontext}>챌린지</div>
              </div>
              <div className={styles.footer_button}>
                <img
                  alt="mypage"
                  src="/new_profile.png"
                  className={styles.footer_mypage}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <div className={styles.icontext}>마이룸</div>
              </div>
            </div>
          </div>
          <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header
              className={styles.modalheader}
              closeButton></Modal.Header>
            <Modal.Body className={styles.modalcontent} closeButton>
              로그인이 필요한 서비스 입니다.
              <div className={styles.btnCt}>
                <button
                  className={styles.backbtn}
                  onClick={() => {
                    handleClose();
                    navigate("/");
                  }}>
                  돌아가기
                </button>
                <button
                  className={styles.logoutbtn}
                  onClick={() => {
                    handleClose();
                    navigate("/login");
                  }}>
                  로그인하기
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default Footer;
