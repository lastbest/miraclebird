import React, { useState, useEffect } from "react";
import spot from "../components/map/spot.json";
import styles from "./Landmark.module.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import optionsJSON from "./options.json";

function Landmark() {
  const [si, setSi] = useState("지역");
  const [gu, setGu] = useState("구역");
  const [filter, setFilter] = useState("");

  const [nftMap, setNftMap] = useState("");
  const [nftData, setNftData] = useState("");
  const [options, setOptions] = useState("");

  useEffect(() => {
    console.log("nftData", nftData);
    var result = [];
    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      if (gu == "구역" || item.dongCode == gu) {
        result.push(
          <div key={i}>
            <img src={item.imagePath} className={styles.landmarkImg}></img>
            <br />
            {item.title} (+{item.starForce})
            <br />
            소유자 {item.userName}
            <br />
            {item.province} ({item.landmarkCity})
            <br />
          </div>
        );
      }
    }
    setNftMap(result);
  }, [nftData]);

  useEffect(() => {
    console.log(gu);
    axios({
      url: API_BASE_URL + "/landmark",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log("mainData", res.data);
        setNftData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    var result = [];

    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      if (gu == "구역" || item.dongCode == gu) {
        result.push(
          <div key={i}>
            <img src={item.imagePath} className={styles.landmarkImg}></img>
            <br />
            {item.title} (+{item.starForce})
            <br />
            소유자 {item.userName}
            <br />
            {item.province} ({item.landmarkCity})
            <br />
          </div>
        );
      }
    }
    setNftMap(result);
  }, [gu]);

  useEffect(() => {
    console.log(si);

    var tempOptions = [];
    var json = [];
    if (si == "지역") {
      json = optionsJSON[0];
    } else if (si == "서울특별시") {
      json = optionsJSON[1];
    } else if (si == "광주광역시") {
      json = optionsJSON[2];
    } else if (si == "경상북도") {
      json = optionsJSON[3];
    } else if (si == "제주특별자치도") {
      json = optionsJSON[4];
    }
    for (var i = 0; i < json.gu.length; i++) {
      var item = json.gu[i];
      tempOptions.push(
        <option key={item.SIG_CD} value={item.SIG_CD}>
          {item.name}
        </option>
      );
    }
    if (si == "지역") {
      setGu("구역");
    }
    setOptions(tempOptions);
  }, [si]);

  return (
    <>
      <select
        onChange={(e) => {
          setSi(e.target.value);
        }}>
        <option key="0" value="지역">
          지역
        </option>
        <option key="1" value="서울특별시">
          서울특별시
        </option>
        <option key="2" value="광주광역시">
          광주광역시
        </option>
        <option key="3" value="경상북도">
          경상북도
        </option>
        <option key="4" value="제주특별자치도">
          제주특별자치도
        </option>
      </select>
      <select
        onChange={(e) => {
          setGu(e.target.value);
        }}>
        {options}
      </select>
      <div className={styles.container}>{nftMap}</div>
    </>
  );
}

export default Landmark;
