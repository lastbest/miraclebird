import React, { useState } from "react";
import styles from "./Admin.module.css";
import "./Admin.css";
import AdminChallenge from "../components/common/AdminChallenge";
import AdminReport from "../components/common/AdminReport";
import LandmarkRegistration from "../components/common/LandmarkRegistration";

function Admin() {
  const [view, setView] = useState(1);

  return (
    <>
      <div className={styles.btnCt}>
        <button
          className={`challengeBtn ${view === 1 ? "active" : ""}`}
          onClick={() => setView(1)}>
          챌린지
        </button>
        <button
          className={`challengeBtn ${view === 2 ? "active" : ""}`}
          onClick={() => setView(2)}>
          신고
        </button>
        <button
          className={`reportBtn ${view === 3 ? "active" : ""}`}
          onClick={() => setView(3)}>
          민팅
        </button>
      </div>
      <div className={styles.component}>
        {view === 1 ? <AdminChallenge /> : ""}
        {view === 2 ? <AdminReport /> : ""}
        {view === 3 ? <LandmarkRegistration /> : ""}
      </div>
    </>
  );
}

export default Admin;
