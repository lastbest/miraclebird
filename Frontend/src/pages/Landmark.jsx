import { style } from "d3";
import React, { useState, useEffect } from "react";
import spot from "../components/map/spot.json";
import styles from "./Landmark.module.css";

function Landmark() {
  const [si, setSi] = useState("-");
  const [gu, setGu] = useState("용산구");
  const [filter, setFilter] = useState("-");

  const options = [
    { key: "seoul", value: "서울특별시" },
    { key: "29000", value: "광주광역시" },
    { key: "47000", value: "경상북도" },
    { key: "50000", value: "제주특별자치도" },
  ];
  const seoul = [
    { key: "11110", Filterlue: "종로구" },
    { key: "11140", value: "중구" },
    { key: "11170", value: "용산구" },
    { key: "11200", value: "성동구" },
  ];
  let result = [];
  for (var i = 0; i < spot.length; i++) {
    for (var j = 0; j < spot[i].landmark.length; j++) {
      var tempUrl = spot[i].landmark[j].index;
      var tempUrl1 = "/src/assets/landmark/" + tempUrl + ".png";

      result.push(
        <div key={i}>
          {spot[i].landmark[j].name}({spot[i].name})
          <br />
          <img src={tempUrl1} className={styles.landmarkImg}></img>
          <br />
          <br />
        </div>
      );
    }
  }
  useEffect(() => {}, [si, result]);
  var len = result.length;
  for (var i = 0; i < len; i++) {
    result.pop();
  }
  for (var i = 0; i < spot.length; i++) {
    for (var j = 0; j < spot[i].landmark.length; j++) {
      var tempUrl = spot[i].landmark[j].index;
      var tempUrl1 = "/src/assets/landmark/" + tempUrl + ".png";
      result.push(
        <div key={i}>
          {spot[i].landmark[j].name}({spot[i].name})
          <br />
          <img src={tempUrl1} className={styles.landmarkImg}></img>
          <br />
          <br />
        </div>
      );
    }
  }
  console.log(gu);
  return (
    <>
      {/* <select>
        <option key="seoul" value="서울특별시">
          서울특별시
        </option>
        <option key="29000" value="광주광역시">
          광주광역시
        </option>
        <option key="47000" value="경상북도">
          경상북도
        </option>
        <option key="50000" value="제주특별자치도">
          제주특별자치도
        </option>
      </select>

      <select
        onChange={(e) => {
          setGu(e.target.value);
        }}>
        <option key="11110" value="종로구">
          종로구
        </option>
        <option key="29000" value="중구">
          중구
        </option>
        <option key="47000" value="용산구">
          용산구
        </option>
        <option key="50000" value="성동구">
          성동구
        </option>
      </select> */}
      <div className={styles.container}>{result}</div>
    </>
  );
}

export default Landmark;
