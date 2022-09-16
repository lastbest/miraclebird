import React, {useState} from "react";
import styles from './MiracleFeed.module.css'
import Modal from 'react-modal';

function MiracleFeed () {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        <div className={styles.feedHeader}>
            <button className={styles.backbtn} onClick={()=>(history.back())}><img alt="back" src="/back.png" className={styles.backicon} /></button>
            <p>미라클 모닝</p>
        </div>
        <div className={styles.feeds}>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={()=>setModalIsOpen(true)}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={()=>setModalIsOpen(true)}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={()=>setModalIsOpen(true)}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={()=>setModalIsOpen(true)}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={()=>setModalIsOpen(true)}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={()=>setModalIsOpen(true)}/>
            </div>
        </div>
        
        <Modal isOpen={modalIsOpen} appElement={document.getElementById('root') || undefined} className={styles.modal}>
            <div className={styles.modalHeader}> 
            <button onClick={()=>setModalIsOpen(false)} className={styles.closebtn}>X</button>
            </div>
            <div className={styles.modalcontent}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} />
                <button className={styles.reportbtn}><img alt="siren" src="/siren.png" className={styles.sirenicon} />신고하기</button>
                <div className={styles.detail}>
                    <p>닉네임</p>
                    <p>시즌1 미라클 모닝</p>
                    <p>2022/09/08</p>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default MiracleFeed;