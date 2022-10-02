import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";
import styles from "./LineChart.module.css";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

const LineChart = ({ data }) => {
  const [landmarkPriceData, setLandmarkPriceData] = useState("");

  const [firstPrice, setFirstPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [len, setLen] = useState("");

  useEffect(() => {
    console.log(data);
    if (data != "") {
      setFirstPrice(data[0].value == null ? null : data[0].value);
      setMinPrice(
        Math.min.apply(
          Math,
          data.map(function (o) {
            return o.value;
          })
        )
      );
      setMaxPrice(
        Math.max.apply(
          Math,
          data.map(function (o) {
            return o.value;
          })
        )
      );
      setCurrentPrice(data[data.length - 1].value);
    } else {
      setFirstPrice(5);
      setMinPrice(5);
      setMaxPrice(5);
      setCurrentPrice(5);
    }
    setLen(data.length);
  }, []);
  useEffect(() => {
    makeGraph();
  }, [len]);

  const svgRef = useRef();
  const makeGraph = () => {
    // setting canvas
    const width = 270;
    const height = 300;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // data

    // setting axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => {
      return g
        .attr("transform", `translate(0, ${height})`)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    };

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).tickSize(-width))
        .call((g) => g.select(".domain").remove())
        .attr("class", "grid")
        .attr("fill", "#787a79")
        .attr("stroke", "#787a79");

    // apply axis to canvas
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // vertical bar chart

    //line chart
    const line = d3
      .line()
      .x((d) => x(d.month) + x.bandwidth() / 2)
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#1d4999")
      .attr("stroke-width", 4)
      .attr("d", line);

    // add text
    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .text((d) => d.value)
      .attr("cx", (data) => x(data.month) + x.bandwidth() / 2)
      .attr("cy", (data) => y(data.value) - 2.5)
      .attr("fill", "#1d4999")
      .attr("r", "3px");

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.value)
      .attr("x", (data) => x(data.month) + x.bandwidth() / 2)
      .attr("y", (data) => y(data.value) - 7)
      .attr("fill", "black")
      .attr("font-family", "Tahoma")
      .attr("font-size", "7px")
      .attr("text-anchor", "middle");
  };

  return (
    <div className={styles.chart}>
      {len >= 1 ? (
        <svg ref={svgRef} className={styles.svg} />
      ) : (
        <div className={styles.nonePrice}>
          <div className={styles.nonePriceText}>거래 내역이 없습니다.</div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>민팅가</th>
            <th>최저가</th>
            <th>최고가</th>
            <th>현재가</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {firstPrice}
              <span className={styles.span}> MIRA</span>
            </td>
            <td>
              {minPrice}
              <span className={styles.span}> MIRA</span>
            </td>
            <td>
              {maxPrice}
              <span className={styles.span}> MIRA</span>
            </td>
            <td>
              {currentPrice}
              <span className={styles.span}> MIRA</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default LineChart;
