import React, {useState} from "react";
import styles from "./Admin.module.css";
import "./Admin.css";
import AdminChallenge from "../components/common/AdminChallenge";
import AdminReport from "../components/common/AdminReport";

function Admin () {
    const [view, setView] = useState(true)

    return (
        <>
        <div className={styles.btnCt}>
            <button className={`challengeBtn ${view === true ? 'active' : ''}`} onClick={()=>(setView(true))}>챌린지</button>
            <button className={`reportBtn ${view === false ? 'active' : ''}`} onClick={()=>(setView(false))}>신고</button>
        </div>
        <div className={styles.component}>
            {view ? <AdminChallenge/>: <AdminReport /> }
        </div>
        </>
    )
}

export default Admin;