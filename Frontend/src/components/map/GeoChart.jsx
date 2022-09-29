import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { select, geoPath, geoMercator } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectArea } from "../../store/area";
import { selectLandmark } from "../../store/landmark";
import "./GeoChart.css";
import spot from "./spot.json";

import Modal from "react-bootstrap/Modal";
import styles from "./GeoChart.module.css";
import LineChart from "./LineChart";
import back from "../../assets/icon/GeoChart_Back.png";
import back_1 from "../../assets/icon/GeoChart_Back1.png";

import Web3 from "web3";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import COMMON_ABI from "../../common/ABI";


/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [isListHover, setIsListHover] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const area = useSelector((state) => state.area.value);
  const landmark = useSelector((state) => state.landmark.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [landmarkInfoIdx, setLandmarkInfoIdx] = useState(1);
  const [sellingItem, setSellingItem] = useState(1);
  const [sellingToken, setSellingToken] = useState(1);
  const user = useSelector((state) => state.user.value);
  const [buyerIdx, setBuyerIdx] = useState(1);
  const [buyerAddress, setBuyerAddress] = useState('');
  const [sellerIdx, setSellerIdx] = useState(1);
  const [sellerAddress, setSellerAddress] = useState('');
  // will be called initially and on every data change

  // SSAFY Network
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain/`)
  );

  useEffect(() => {
    if (area.name == "korea" || area.name == null) {
      setSelectedCountry(null);
      setIsListHover(false);
    }
  }, [area]);
  useEffect(() => {
    setImgUrl("/src/assets/landmark/" + landmark.index + ".png");
  }, [landmark]);

  useEffect(() => {
    const svg = select(svgRef.current);

    console.log(imgUrl);
    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);
    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();
    // render each country
    svg
      .selectAll(".city")
      .data(data.features)
      .join("path")
      .on("click", (event, feature) => {
        console.log(feature.properties.SIG_CD);
        console.log(wrapperRef);
        dispatch(
          selectArea({
            name: feature.properties.name,
            SIG_CD: feature.properties.SIG_CD,
          })
        );

        if (selectedCountry === feature) {
          setSelectedCountry(null);
          dispatch(selectArea({ name: "korea" }));
        } else {
          setSelectedCountry(feature);
        }

        svg.selectAll("circle").remove();
        svg.selectAll("text").remove();
        console.log(area);
      })
      .attr("class", "city")
      .transition()
      .attr("d", (feature) => pathGenerator(feature));

    if (area.name != "korea") {
      var mark = spot;
      for (var i = 0; i < spot.length; i++) {
        if (area.name == mark[i].name) {
          console.log(mark[i].landmark);
          mark = mark[i].landmark;
          svg.selectAll("circle").remove();
          svg.selectAll("text").remove();
          break;
        }
      }
      svg
        .selectAll("circle")
        .data(mark)
        .join("circle")
        .attr("class", "mark")
        .attr("cx", function (d) {
          if (isNaN(projection([d.lon, d.lat])[0])) {
            return 0;
          }
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
          if (isNaN(projection([d.lon, d.lat])[1])) {
            return 0;
          }
          return projection([d.lon, d.lat])[1];
        })
        .on("click", (event, d) => {
          console.log(d.name);
          setLandmarkInfoIdx(d.index)
          setImgUrl("/src/assets/landmark/" + landmark.index + ".png");
          dispatch(
            selectLandmark({
              index: d.index,
              name: d.name,
              desc: d.desc,
            })
          );
          handleShow();
        })
        .attr("r", "10px")
        .attr("fill", "#1d4999")
        .transition()
        .duration(1000);

      svg
        .selectAll(".landmarkLabel")
        .data(mark)
        .join("text")
        .attr("class", "landmarkLabel")
        .attr("x", function (d) {
          if (isNaN(projection([d.lon, d.lat + 0.007])[0])) {
            return 0;
          }
          return projection([d.lon, d.lat + 0.007])[0];
        })
        .attr("y", function (d) {
          if (isNaN(projection([d.lon, d.lat + 0.007])[1])) {
            return 0;
          }
          return projection([d.lon, d.lat + 0.007])[1];
        })
        .text(function (d) {
          return d.name;
        })
        .on("click", (event, d) => {
          console.log(d.name);
          setImgUrl("/src/assets/landmark/" + landmark.index + ".png");
          dispatch(
            selectLandmark({
              index: d.index,
              name: d.name,
              desc: d.desc,
            })
          );
          handleShow();
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", 15)
        .style("fill", "black")
        .transition();
    } else {
      svg.selectAll("mark").remove();
      svg.selectAll("text").remove();
      mark = null;
    }

    // 지역별 텍스트
    if (area.SIG_CD != null && area.SIG_CD.length == 2) {
      svg.selectAll("circle").remove();
      svg.selectAll("text").remove();
      svg
        .selectAll(".labels")
        .data(data.features)
        .join("text")
        .attr("class", "labels")
        .attr("x", function (d) {
          return pathGenerator.centroid(d)[0];
        })
        .attr("y", function (d) {
          return pathGenerator.centroid(d)[1];
        })
        .text(function (d) {
          return d.properties.name;
        })
        .on("click", (event, feature) => {
          console.log(feature.properties.SIG_CD);
          console.log(wrapperRef);
          dispatch(
            selectArea({
              name: feature.properties.name,
              SIG_CD: feature.properties.SIG_CD,
            })
          );

          if (selectedCountry === feature) {
            setSelectedCountry(null);
            dispatch(selectArea({ name: "korea" }));
          } else {
            setSelectedCountry(feature);
          }

          svg.selectAll("circle").remove();
          svg.selectAll("text").remove();
          console.log(area);
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", 15)
        .style("fill", "#363636");
    }

    svg
      .select("#arrow1")
      .append("polygon")
      .attr("points", "0 0, 0 12, 12 12, 12 0")
      .attr("fill", "black")
      .append("polygon")
      .attr("points", "0 0, 0 6, 6 6, 12 0, 0 0")
      .attr("fill", "blue");
  }, [data, dimensions, selectedCountry]);

  const result = [];
  for (var i = 0; i < spot.length; i++) {
    for (var j = 0; j < spot[i].landmark.length; j++) {
      var tempUrl = spot[i].landmark[j].index;
      var tempUrl1 = "/src/assets/landmark/" + tempUrl + ".png";

      result.push(
        <div key={i}>
          <img src={tempUrl1}></img>
          <br />
          {spot[i].landmark[j].name}
        </div>
      );
    }
  }

  useEffect(() => {
    console.log(landmarkInfoIdx)
    axios(API_BASE_URL + "/landmark/landmarkinfoidx/" + landmarkInfoIdx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((result) => {
        console.log(result.data);
        result.data.map((item) => {
          if (item.selling === true) {
            setSellingItem(item.landmarkIdx)
            setSellingToken(item.tokenId)
            setSellerIdx(item.userIdx)
          }
        })
        console.log(sellingItem)
        console.log(sellingToken)
      })
      .catch((err) => console.log(landmarkInfoIdx, "Get error", err));
  })

  useEffect(() => {
    axios(API_BASE_URL + "/wallet/" + sellerIdx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log(res.data);
        const sellerWalletData = res.data;
        setSellerAddress(sellerWalletData.walletAddress)
      })
      .catch((err) => console.log("Get seller data error", err));
  })

  useEffect(() => {
    setBuyerIdx(user.information.userIdx)
    axios(API_BASE_URL + "/wallet/" + buyerIdx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log(res.data);
        const buyerWalletData = res.data;
        setBuyerAddress(buyerWalletData.walletAddress)
      })
      .catch((err) => console.log("Get buyer data error", err));
  })

  // 구매
  const Purchase = () => {
    console.log(user);
    console.log(sellingItem)
    console.log(sellingToken)
    console.log(landmarkInfoIdx)
    
    const sender = web3.eth.accounts.privateKeyToAccount('0x474d486a4009e752f6608594385a4676ce85ffe359221b210875516c02047ab3');
    web3.eth.accounts.wallet.add(sender);
    console.log(web3.eth.accounts.wallet);
    web3.eth.defaultAccount = sender.address;
    console.log("defaultAccount :", web3.eth.defaultAccount);
    const senderAddress = web3.eth.defaultAccount;

    const sendLandmarkNft = new web3.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.NFT_ABI,
        "0xED71ceA7Ae66892792c2E3d86156B29A71a1677a"
      );
    
    console.log("sellerAccount :", sellerAddress)
    console.log("senderAccount :", senderAddress)
    console.log("buyerAccount :", buyerAddress)
    const response = sendLandmarkNft.methods
      .safeTransferFrom(sellerAddress, buyerAddress, sellingToken)
      .send({ from: senderAddress, gas: 3000000 });
    console.log(response);

    // put landmark
    axios(API_BASE_URL + "/landmark/" + sellingItem, {
      method: "PUT",
      params: {
        user_idx: buyerIdx,
      },
      data: {
        // 해당 아이템이 구매된 가격 임의로 5
        "sellPrice": 5,
        "selling": 0,
        // 해당 아이템의 스타포스 임의로 1
        "starForce": 1
      },
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log(res)
        // put my nft
        axios(API_BASE_URL + "/mynft/" + sellingItem, {
          method: "PUT",
          params: {
            user_idx: buyerIdx,
          },
          headers: {
            Authorization: "Bearer " + NOW_ACCESS_TOKEN,
          },
        })
          .then((res) => {
            console.log(res)
            alert("구매에 성공했습니다. 마이페이지를 확인해주세요.")

          })
          .catch((err) => console.log("My NFT PUT error", err));

      })
      .catch((err) => console.log("Purchase error", err));
    return(
      <div>
      </div>
    )
  }



  return (
    <>
      <div className={styles.upper}>
        {area.name == "korea" ? null : (
          <img
            src={isListHover ? back_1 : back}
            className={styles.back}
            onMouseOver={() => setIsListHover(true)}
            onMouseOut={() => setIsListHover(false)}
            onClick={() => {
              console.log(area.SIG_CD);
              if (area.SIG_CD.length == 2) {
                setSelectedCountry(null);
                dispatch(
                  selectArea({
                    name: "korea",
                    SIG_CD: "",
                  })
                );
              } else {
                dispatch(
                  selectArea({
                    name: "korea",
                    SIG_CD: "",
                  })
                );
              }
            }}
          />
        )}
        <button
          className={styles.connect}
          onClick={() => navigate("/landmark")}>
          전체보기
        </button>
      </div>


      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        {selectedCountry !== null ? <div>{area.name}</div> : <div></div>}
        <svg ref={svgRef}></svg>
      </div>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}>
        <Modal.Header className={styles.modalheader} closeButton>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.modalcontent}>
            <img src={imgUrl} alt="mm" className={styles.picture} />

            <div className={styles.detail}>
              <p>{landmark.name}</p>
              <div className={styles.purchase}>
                {landmark.desc != null ? (
                  <div className={styles.desc}>{landmark.desc}</div>
                ) : (
                  <></>
                )}

                <LineChart className={styles.chart} />

                <div className={styles.reward}>
                  <img alt="coin" src="/mira.png" className={styles.coin}></img>
                  <p className={styles.price}>300 MIRA</p>
                  <button className={styles.btn} onClick={Purchase}>구입</button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.modalcontent}>{result}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GeoChart;
