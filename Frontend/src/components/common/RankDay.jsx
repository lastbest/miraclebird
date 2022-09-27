import React from "react";
import styles from "./RankDay.module.css";

function RankDay () {
    return (
        <>
        <div className={styles.medalcontainer}>
            <div className={styles.silver}>
                <img alt="silver" src='./silver.png' />
                <p className={styles.slidetext}>김싸피</p>
            </div>
            <div className={styles.gold}>
                <img alt="gold" src='./gold.png' />
                <p className={styles.slidetext}>이싸피</p>
            </div>
            <div className={styles.bronze}>
                <img alt="bronze" src='./bronze.png' />
                <p className={styles.slidetext}>최싸피</p>
            </div>
        </div>
        </>
    )
};

export default RankDay;