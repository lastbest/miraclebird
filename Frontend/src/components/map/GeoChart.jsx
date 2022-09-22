import React, { useRef, useEffect, useState } from "react";
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

/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isListHover, setIsListHover] = useState(false);

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
          dispatch(
            selectLandmark({
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
          dispatch(
            selectLandmark({
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

  return (
    <>
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
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.modalcontent}>
            <img
              src="/landmark_lotteworld.png"
              alt="mm"
              className={styles.picture}
            />
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
                  <button className={styles.btn}>구입</button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
                <div className={styles.desc}>{landmark.desc}</div>
              ) : (
                <></>
              )}

              <LineChart className={styles.chart} />

              <div className={styles.reward}>
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
