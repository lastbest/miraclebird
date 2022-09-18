import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, csv } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useSelector } from "react-redux";
import { selectArea } from "../../store/area";
import { selectLandmark } from "../../store/landmark";
import "./GeoChart.css";
import { useDispatch } from "react-redux";
import spot1 from "./spot29170.json";
import spot2 from "./spot29110.json";
import spot3 from "./spot11710.json";
import Modal from "react-modal";
import styles from "./GeoChart.module.css";

/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const area = useSelector((state) => state.area.value);
  const landmark = useSelector((state) => state.landmark.value);
  const dispatch = useDispatch();

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  // will be called initially and on every data change

  // console.log(spot);
  useEffect(() => {
    const svg = select(svgRef.current);
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

        console.log(area);
      })
      .attr("class", "city")
      .transition()
      .attr("d", (feature) => pathGenerator(feature));

    if (area.name == "북구" || area.name == "동구" || area.name == "송파구") {
      var mark = spot1;
      if (area.name == "동구") {
        mark = spot2;
      } else if (area.name == "송파구") {
        mark = spot3;
      }
      svg
        .selectAll("circle")
        .data(mark)
        .join("circle")
        .attr("class", "mark")
        .attr("cx", function (d) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
          return projection([d.lon, d.lat])[1];
        })
        .on("click", (event, d) => {
          console.log(d.name);
          dispatch(
            selectLandmark({
              name: d.name,
              desc: d.desc,
            })
          );
          setModalIsOpen(true);
        })
        .transition()
        .duration(1000)
        .attr("r", "10px")
        .attr("fill", "#1d4999");

      svg
        .selectAll(".labelsc")
        .data(mark)
        .join("text")
        .attr("class", "labelsc")
        .attr("x", function (d) {
          return projection([d.lon, d.lat + 0.007])[0];
        })
        .attr("y", function (d) {
          return projection([d.lon, d.lat + 0.007])[1];
        })
        .text(function (d) {
          return d.name;
        })
        .on("click", (event, d) => {
          console.log(d.name);
          dispatch(
            selectLandmark({
              name: d.name,
              desc: d.desc,
            })
          );
          setModalIsOpen(true);
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", 15)
        .style("fill", "black");
    } else {
      svg.selectAll("mark").remove();
      svg.selectAll("text").remove();
    }

    // 선택되 지역 텍스트
    // svg
    //   .selectAll(".label")
    //   .data([selectedCountry])
    //   .join("text")
    //   .attr("class", "label")
    //   .text((feature) => feature && feature.properties.name + ": ")
    //   .attr("x", 10)
    //   .attr("y", 25);

    // 지역별 텍스트
    // svg
    //   .selectAll(".labels")
    //   .data(data.features)
    //   .join("text")
    //   .attr("class", "labels")
    //   .attr("x", function (d) {
    //     return pathGenerator.centroid(d)[0];
    //   })
    //   .attr("y", function (d) {
    //     return pathGenerator.centroid(d)[1];
    //   })
    //   .text(function (d) {
    //     return d.properties.name;
    //   })
    //   .on("click", (event, feature) => {
    //     console.log(feature.properties.name);
    //     console.log(wrapperRef);
    //     dispatch(selectArea({ name: feature.properties.name }));
    //     console.log("Click : " + area.name);
    //     if (selectedCountry === feature) {
    //       setSelectedCountry(null);
    //       dispatch(selectArea({ name: "korea" }));
    //     } else {
    //       setSelectedCountry(feature);
    //     }
    //   })
    //   .attr("text-anchor", "middle")
    //   .attr("alignment-baseline", "central")
    //   .style("font-size", 15)
    //   .style("fill", "black");
  }, [data, dimensions, selectedCountry]);

  return (
    <>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        {selectedCountry !== null ? <div>{area.name}</div> : <div></div>}

        <svg ref={svgRef}></svg>
      </div>
      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root") || undefined}
        className={styles.modal}>
        <div className={styles.modalHeader}>
          <button
            onClick={() => setModalIsOpen(false)}
            className={styles.closebtn}>
            X
          </button>
        </div>
        <div className={styles.modalcontent}>
          {landmark.name == "롯데월드" ? (
            <img
              src="/landmark_lotteworld.png"
              alt="mm"
              className={styles.picture}
            />
          ) : (
            <img src="/landmark_jnu.png" alt="mm" className={styles.picture} />
          )}

          <div className={styles.detail}>
            <p>{landmark.name}</p>
            <div className={styles.purchase}>
              {landmark.desc != null ? (
                <div className={styles.desc}>
                  {landmark.desc.substr(0, 90) + "..."}
                </div>
              ) : (
                <></>
              )}

              <div className={styles.reward}>
                <p>Reward:</p>
                <img alt="coin" src="/mira.png" className={styles.coin}></img>
                <p>300 MIRA</p>
                <button className={styles.btn}>구입</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default GeoChart;
