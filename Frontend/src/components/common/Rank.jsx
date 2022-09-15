import React from "react";
import styles from "./Rank.module.css"

function Rank() {
    return (
        <>
        <div className={styles.content}>
            <div className={styles.header}>
                <img alt="rank" src="/rank.png" className={styles.rankicon}/>
                <h3>챌린지 랭킹</h3>
            </div>
        </div>
        <div className={styles.content2}>
            <div className={styles.header}>
                <img alt="nft" src="/nftenhance.png" className={styles.nfticon}/>
                <h3>NFT OWNER</h3>
            </div>
        </div>
        </>
    )
};

export default Rank;