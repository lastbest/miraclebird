import React, {useState} from "react";
import styles from "./Rank.module.css";
import Modal from 'react-modal';

function Rank() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.rankcontainer}>
                    <img alt="rank" src="/rank.png" className={styles.rankicon}/>
                    <h3 onClick={()=>setModalIsOpen(true)}>챌린지 랭킹</h3>
                </div>
            </div>
        </div>
        <div className={styles.content2}>
            <div className={styles.header}>
                <img alt="nft" src="/nftenhance.png" className={styles.nfticon}/>
                <h3>NFT OWNER</h3>
            </div>
        </div>

        <Modal isOpen={modalIsOpen} appElement={document.getElementById('root') || undefined} className={styles.modal}>
            <div className={styles.modalHeader}> 
            <button onClick={()=>setModalIsOpen(false)} className={styles.closebtn}>X</button>
            </div>
            <div className={styles.modalcontent}>
                랭킹은 챌린지 지속시간, 횟수에 따라 산정됩니다.
                
            </div>
        </Modal>
        </>
    )
};

export default Rank;