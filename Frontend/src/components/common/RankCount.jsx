import React from "react";
import styles from "./RankCount.module.css";

function RankCount () {
    return (
        <>
        <div className={styles.medalcontainer}>
            <div className={styles.silver}>
                <img alt="silver" src='./silver.png' />
                <p className={styles.slidetext}>정싸피</p>
            </div>
            <div className={styles.gold}>
                <img alt="gold" src='./gold.png' />
                <p className={styles.slidetext}>박싸피</p>
            </div>
            <div className={styles.bronze}>
                <img alt="bronze" src='./bronze.png' />
                <p className={styles.slidetext}>한싸피</p>
            </div>
        </div>
        </>
    )
};

export default RankCount;