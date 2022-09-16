import React, { useState } from "react";
// import Video from "./Video";
import GeoChart from "../components/map/GeoChart";
import data from "../assets/json/korea.json";
import seoul from "../assets/json/seoul.json";
import { useSelector } from "react-redux";

function Store() {
  const area = useSelector((state) => state.area.value);
  const [property, setProperty] = useState("pop_est");

  return (
    <React.Fragment>
      <h2>Select property to highlight</h2>
      {area.name == "서울특별시" ? (
        <GeoChart data={seoul} property={property} />
      ) : (
        <GeoChart data={data} property={property} />
      )}

    </React.Fragment>
  );
}

export default Store;
