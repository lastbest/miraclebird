import React, { useState, useRef, useEffect } from "react";
import styles from "./MyPage.module.css";
import Modal from "react-bootstrap/Modal";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./Mypage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import MypageFeed from "../components/common/MypageFeed";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../store/user";
import Web3 from "web3";
import { Loading1 } from "../components/Base/Loading1";

import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import seasonInfo from "./season.json";

import COMMON_ABI from "../common/ABI";
import getAddressFrom from "../util/AddressExtractor";

const BLOCKCHAIN_URL = "http://20.196.209.2:8545";

function MyPage() {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [userData, setUserData] = useState("");
  const [wallet, setWallet] = useState("");
  const [nftData, setNftData] = useState("");
  const [challengeData, setChallengeData] = useState("");
  const [keepDate, setKeepDate] = useState("");

  const [flag, setFlag] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [tempKey, setTempKey] = useState("");
  const keyRef = useRef(null);
  const [nftMap, setNftMap] = useState("");
  const [season, setSeason] = useState(1);
  const [challengeMap, setChallengeMap] = useState("");

  const [tokenBalance, setTokenBalance] = useState(0);
  const [privKey, setPrivKey] = useState("");

  const [sellTokenId, setSellTokenId] = useState(0);
  const [sellStarForce, setSellStarForce] = useState(0);
  const [sellLandmarkIdx, setSellLandmarkIdx] = useState(0);

  useEffect(() => {
    async function data() {
      await axios({
        url: API_BASE_URL + "/auth/",
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      })
        .then((res) => {
          setUserData(res.data.information);
          console.log(res.data);
          setLoading1(true);
          axios({
            url: API_BASE_URL + "/wallet/" + res.data.information.userIdx,
            method: "get",
            headers: {
              Authorization: "Bearer " + NOW_ACCESS_TOKEN,
            },
          })
            .then((res) => {
              setWallet(res.data);
              console.log(wallet);
            })
            .catch((error) => {
              console.log(error);
            });
        })

        .catch((error) => {
          console.log(error);
        });
    }
    data();
  }, []);

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/verification/streak/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setKeepDate(res.data);
        // console.log('keep',keepDate)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  useEffect(() => {
    console.log("userDate", userData);

    var startdate = seasonInfo[season - 1].startDate + "_00:00:00.000";
    var enddate = seasonInfo[season - 1].endDate + "_23:59:59.000";

    axios({
      url: API_BASE_URL + "/verification/heatmap/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
      params: {
        start_date: startdate,
        end_date: enddate,
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  useEffect(() => {
    console.log("userDate", userData);

    var startdate = seasonInfo[season - 1].startDate + "_00:00:00.000";
    var enddate = seasonInfo[season - 1].endDate + "_23:59:59.000";

    axios({
      url: API_BASE_URL + "/verification/heatmap/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
      params: {
        start_date: startdate,
        end_date: enddate,
      },
    })
      .then((res) => {
        var temp = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          if (item.approval == 1) {
            temp.push(item);
          }
        }
        setChallengeData(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  useEffect(() => {
    console.log("challengeData", challengeData);
    const tempChallengeMap = {
      values: [],
    };
    var pre = "";
    var count = 1;
    if (challengeData.length != 0) {
      pre =
        challengeData[0].regtime[0] +
        "-" +
        challengeData[0].regtime[1] +
        "-" +
        challengeData[0].regtime[2];
    }
    console.log(pre);
    for (var i = 1; i < challengeData.length; i++) {
      var now =
        challengeData[i].regtime[0] +
        "-" +
        challengeData[i].regtime[1] +
        "-" +
        challengeData[i].regtime[2];
      if (pre == now) {
        count++;
      } else {
        tempChallengeMap.values.push({ date: pre, count: count });
        pre = now;
        count = 1;
      }
    }
    if (challengeData.length != 0) {
      tempChallengeMap.values.push({ date: pre, count: count });
    }
    setChallengeMap(tempChallengeMap);
  }, [challengeData]);

  // useEffect(() => {
  //   console.log("wallet", wallet);
  // }, [wallet]);

  // my nft
  useEffect(() => {
    axios({
      url: API_BASE_URL + "/landmark/user/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        var result = [];
        if (userData.userIdx == 1) {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            if (item.starForce != 1) continue;
            result.push(item);
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            result.push(item);
          }
        }
        setNftData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  useEffect(() => {
    console.log("nftData", nftData);
    var result = [];
    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      result.push(
        <SwiperSlide className={styles.nftslide} key={i}>
          <div className={styles.nftImgContainer}>
            <img alt="nft1" src={item.imagePath} className={styles.nfturl} />
          </div>
          <div className={styles.nftcard}>
            <div className={styles.nftname}>{item.nftname}</div>
            <div className={styles.nftdetail}>{item.nftdetail}</div>
            <div className={styles.miraprice}>
              <img alt="mira" src="/mira.png" className={styles.miraicon} />
              <div className={styles.nftprice}> {item.sellPrice} MIRA</div>
            </div>
            <div className={styles.btnContainer}>
              {item.selling === false ? (
                <>
                  <button
                    className={styles.btnReinforce}
                    onClick={() => {
                      navigate("/reinforce");
                    }}>
                    강화
                  </button>
                  <button
                    className={styles.btnSell}
                    onClick={(e) =>
                      handleShow3(
                        item.tokenId,
                        item.starForce,
                        item.landmarkIdx,
                        e
                      )
                    }>
                    판매
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.btnReinforce2}>강화</button>
                  <button className={styles.btnonsale}>판매중</button>
                </>
              )}
            </div>
          </div>
        </SwiperSlide>
      );
    }
    setNftMap(result);
    return () => {
      setLoading1(false);
    };
  }, [nftData]);

  useEffect(() => {
    console.log("season", season);
  }, [season]);

  // SSAFY Network
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  // call Mira Token
  const callMiraToken = new web3.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.ERC_ABI,
    "0x741Bf8b3A2b2446B68762B4d2aD70781705CCa83"
  );

  // 관리자 계정의 miratoken 조회로 해놓음 balanceof안의 주소를 user계좌로 바꾸면 됨
  async function getTokenBalance() {
    const response = await callMiraToken.methods
      .balanceOf(wallet.walletAddress)
      .call();
    setTokenBalance(response);
    console.log(response);
  }

  useEffect(() => {
    getTokenBalance();
  }, [wallet]);

  // nft 판매 권한을 관리자에게 넘긴다
  async function ApproveItem() {
    const address = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );
    console.log("address", address);
    if (!address) return;
    try {
      const sender = web3.eth.accounts.privateKeyToAccount(privKey);
      web3.eth.accounts.wallet.add(sender);
      console.log(web3.eth.accounts.wallet);
      web3.eth.defaultAccount = sender.address;
      console.log("defaultAccount :", web3.eth.defaultAccount);

      const senderAddress = web3.eth.defaultAccount;
      const approveNft = new web3.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.NFT_ABI,
        "0xED71ceA7Ae66892792c2E3d86156B29A71a1677a"
      );

      // approve할 관리자주소
      const response = await approveNft.methods
        .approve("0x52aEdCe8c99d769C9896A518Cb5927744F5da32b", sellTokenId)
        .send({ from: senderAddress, gas: 3000000 });
      console.log(response);

      // db에 가격 변경 및 selling 여부 변경
      axios(API_BASE_URL + "/landmark/" + sellLandmarkIdx, {
        method: "PUT",
        params: {
          user_idx: userData.userIdx,
        },
        data: {
          sellPrice: sell,
          selling: 1,
          starForce: sellStarForce,
        },
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      })
        .then((res) => {
          console.log(res);
          handleClose0();
          handleShow7();
        })
        .catch((err) => console.log("Edit Price error", err));
    } catch (err) {
      console.log("ERROR while Approving item", err);
    }
    return <div></div>;
  }

  const [show0, setShow0] = useState(false);
  const handleClose0 = () => setShow0(false);
  const handleShow0 = () => setShow0(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const selling = (e) => {
    ApproveItem();
  };
  const handleShow3 = (tokenId, starForce, landmarkIdx, e) => {
    e.preventDefault();
    setShow3(true);
    setSellTokenId(tokenId);
    setSellStarForce(starForce);
    setSellLandmarkIdx(landmarkIdx);
  };
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [Image, setImage] = useState("");
  const fileInput = useRef(null);
  let [write, setWrite] = useState("");
  let [sell, setSell] = useState("");
  let [sale, setSale] = useState("");
  let [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  function copyToClip(e) {
    keyRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }
  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(userData.image_url);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {loading1 ? (
        <Loading1 />
      ) : (
        <>
          <div className={styles.btns}>
            {userData.name === "관리자" ? (
              <button
                className={styles.adminpage}
                onClick={() => navigate("/admin")}>
                관리자페이지
              </button>
            ) : (
              ""
            )}
            <button className={styles.logout} onClick={() => handleShow5()}>
              로그아웃
            </button>
            <button className={styles.connect} onClick={() => handleShow()}>
              CONNECT
            </button>
          </div>
          <div className={styles.profile}>
            <div className={styles.profileimg}>
              <img
                src={
                  user.information.imageUrl == "" ||
                  user.information.imageUrl == undefined ||
                  user.information.imageUrl == null
                    ? "src/assets/icon/profile_default.jpg"
                    : user.information.imageUrl
                }
                className={styles.profileupload}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                name="profile_img"
                ref={fileInput}
              />
              <div className={styles.nicknamebox}>
                <div className={styles.nickname}>{user.information.name}</div>
                <button className={styles.pencilbtn} onClick={handleShow2}>
                  <img
                    src="/pencil.png"
                    alt="pencil"
                    className={styles.pencil}
                  />
                </button>
              </div>
            </div>
            <div className={styles.profiledetail}>
              <div className={styles.detail1}>
                <div className={styles.nftnumber}>{nftData.length}</div>
                <div className={styles.nfttext}>보유 NFT</div>
              </div>
              <div className={styles.detail2}>
                <div className={styles.mira}>{tokenBalance}</div>
                <div className={styles.miratext}>보유 MIRA</div>
              </div>
              <div className={styles.detail3}>
                <div className={styles.rank}>{keepDate}</div>
                <div className={styles.ranktext}>지속일</div>
              </div>
            </div>
          </div>
          <div>
            <select
              className={styles.selectBox}
              onChange={(e) => setSeason(e.target.value)}>
              {seasonInfo.map((item) => {
                return (
                  <option key={item.season} value={item.season}>
                    시즌 {item.season}
                  </option>
                );
              })}
            </select>

            <div className={styles.heatmapcontainer}>
              <CalendarHeatmap
                startDate={seasonInfo[season - 1].startDate}
                endDate={seasonInfo[season - 1].endDate}
                horizontal={false}
                showMonthLabels={false}
                values={challengeMap.values}
                classForValue={(value) => {
                  if (!value) {
                    return "color-empty";
                  }
                  return `color-scale-${value.count >= 4 ? 4 : value.count}`;
                }}
                tooltipDataAttrs={(value) => {
                  if (!value || !value.date) {
                    return null;
                  }
                  return {
                    "data-tip": `${value.date} 인증 횟수: ${value.count}`,
                  };
                }}
              />
              <ReactTooltip className={styles.tooltip} />
            </div>
          </div>
          <div className={styles.nftContainer}>
            <div className={styles.text1}>보유 NFT</div>
            <div className={styles.nftImg}>
              {nftData.length === 0 ? (
                <div className={styles.nonenft}>
                  <div className={styles.gostoreText}>NFT를 구매해보세요!</div>
                  <button
                    onClick={() => navigate("/store")}
                    className={styles.gostore}>
                    구매하러가기
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <Swiper
                modules={Navigation}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                className={styles.swiper}>
                {nftMap}
              </Swiper>
            </div>
          </div>

          <div className={styles.challengeCt}>
            <MypageFeed userData={userData} data={challengeMap} />
          </div>
          <div>
            <button className={styles.userDelete} onClick={() => handleShow6()}>
              회원탈퇴
            </button>
          </div>
        </>
      )}

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          <img alt="wallet" src="/wallet.png" className={styles.wallet} />
          {(wallet.walletAddress == undefined || wallet.walletAddress == "") &&
          tempKey == "" ? (
            <>
              <div className={styles.buttonCt}>
                <button
                  onClick={() => handleClose()}
                  className={styles.closebtn}>
                  닫기
                </button>
                <button
                  className={styles.walletbtn}
                  onClick={(e) => {
                    e.preventDefault();
                    var web3 = new Web3(BLOCKCHAIN_URL);
                    var privateKey = web3.eth.accounts.create();
                    // console.log(privateKey);
                    // console.log(userData);
                    // console.log(privateKey.address);
                    axios({
                      url: API_BASE_URL + "/wallet",
                      method: "post",
                      headers: {
                        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                      },
                      data: {
                        userIdx: userData.userIdx,
                        walletAddress: privateKey.address,
                      },
                    }).then((res) => {
                      setTempKey(privateKey.privateKey);
                    });
                  }}>
                  지갑 생성
                </button>
              </div>
            </>
          ) : (
            <div className={styles.walletAddress}>
              {wallet.walletAddress == undefined ? (
                <div className={styles.walletText}>
                  <strong>경고!</strong>
                  <p className={styles.keyText}>
                    1. 지갑 비밀키를 잃어버리지 마세요! 한 번 잃어버리면 복구 할
                    수 없습니다.
                    <br />
                    2. 공유하지 마세요! 비밀키가 악위적인 사이트에 노출되면
                    당신의 자산이 유실될 수 있습니다.
                    <br />
                    3. 백업을 만들어 두세요! 종이에 적어서 오프라인으로
                    관리하세요.
                  </p>

                  <div className={styles.btnDiv}>
                    <textarea
                      ref={keyRef}
                      value={tempKey}
                      className={styles.textarea}></textarea>
                    {document.queryCommandSupported("copy") && (
                      <button onClick={copyToClip} className={styles.copybtn}>
                        복사
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setTempKey(tempKey);
                        handleClose();
                        document.location.href = "/mypage";
                      }}
                      className={styles.walletCheckbtn}>
                      확인
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.walletAddressText}>지갑 주소</div>
                  <div className={styles.walletText}>
                    {wallet.walletAddress}
                  </div>
                  <button
                    onClick={() => {
                      handleClose();
                      setFlag(true);
                    }}
                    className={styles.walletCheckbtn}>
                    확인
                  </button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent2} closeButton>
          <div className={styles.nicknamechange}>닉네임변경</div>
          <div className={styles.nicknamecontainer}>
            <input
              autoComplete="nickname"
              name="nickname"
              className={styles.nicknameinput}
              placeholder="닉네임"
              onInput={(event) => {
                setWrite(event.target.value);
              }}
            />
            <button
              onClick={() => {
                handleClose2;
                axios({
                  url: API_BASE_URL + "/user/" + userData.userIdx,
                  method: "put",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                  params: {
                    // user_idx: user.information.userIdx,/
                    name: write,
                  },
                }).then((res) => {
                  console.log(res.data);
                });
                document.location.href = "/mypage";
              }}
              className={styles.nicknamebtn}>
              변경하기
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent3} closeButton>
          <div className={styles.sellprice}>판매가격</div>
          <div className={styles.selltext}>※판매가는 수정할 수 없습니다.</div>
          <div className={styles.pricecontainer}>
            <input
              autoComplete="price"
              name="price"
              className={styles.priceinput}
              placeholder="판매가"
              onInput={(event) => {
                setSell(event.target.value);
              }}
            />
            <input
              autoComplete="privKey"
              name="privKey"
              className={styles.priceinput}
              placeholder="개인키"
              onInput={(event) => {
                setPrivKey(event.target.value);
              }}
            />
            <button
              onClick={(e) => {
                console.log(sell);
                console.log(sellTokenId);
                handleShow0();
                selling(e);
              }}
              className={styles.sellbtn}>
              판매하기
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent4} closeButton>
          <div className={styles.sellprice}>판매가격</div>
          <div className={styles.pricecontainer}>
            <input
              autoComplete="price"
              name="price"
              className={styles.priceinput}
              placeholder={sale}
              onInput={(event) => {
                setSell(event.target.value);
              }}
            />
            <button
              onClick={() => {
                console.log(sell);
                handleClose4(false);
              }}
              className={styles.sellbtn}>
              수정하기
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show5}
        onHide={handleClose5}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent5} closeButton>
          로그아웃하시겠습니까?
          <div className={styles.btnCt}>
            <button className={styles.backbtn} onClick={() => handleClose5()}>
              돌아가기
            </button>
            <button
              className={styles.logoutbtn}
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                console.log(document.cookie);
                dispatch(login(null));
                removeCookie("refreshToken", { path: "/" });
                handleClose5();
                document.location.href = "/";
              }}>
              로그아웃
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={show6}
        onHide={handleClose6}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent5} closeButton>
          탈퇴 시 사용자의 지갑도 함께 삭제됩니다.
          <br />
          탈퇴하시겠습니까?
          <div className={styles.btnCt}>
            <button className={styles.backbtn} onClick={() => handleClose5()}>
              돌아가기
            </button>
            <button
              className={styles.logoutbtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/wallet/" + wallet.walletIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    setWallet(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                axios({
                  url: API_BASE_URL + "/user/" + userData.userIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    console.log("회원삭제");
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("refreshToken");
                // console.log(document.cookie);
                // dispatch(login(null));
                // removeCookie("refreshToken", { path: "/" });
                // handleClose6();

                navigate("/");
              }}>
              회원탈퇴
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show7}
        onHide={handleClose7}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent7} closeButton>
          판매중으로 변경되었습니다!
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show0}
        onHide={handleClose0}
        backdrop="static"
        keyboard={false}
        className={styles.dialog0}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <Loading1 text="판매진행중입니다." />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyPage;
