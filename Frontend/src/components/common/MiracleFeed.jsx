import React, {useState} from "react";
import styles from './MiracleFeed.module.css'
import Modal from 'react-bootstrap/Modal';

function MiracleFeed () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className={styles.feedHeader}>
            <button className={styles.backbtn} onClick={()=>(history.back())}><img alt="back" src="/back.png" className={styles.backicon} /></button>
            <p>미라클 모닝</p>
        </div>
        <div className={styles.feeds}>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
        </div>
        
        <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className={styles.modalheader} closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modalcontent} closeButton>
                <img src="/miraclemorning.png" alt="mm" className={styles.picture} />
                <button className={styles.reportbtn}><img alt="siren" src="/siren.png" className={styles.sirenicon} />신고하기</button>
                <div className={styles.detail}>
                    <p>닉네임</p>
                    <p>시즌1 미라클 모닝</p>
                    <p>2022/09/08</p>
                </div>
            </Modal.Body>
        </Modal>

        </>
    )
}

export default MiracleFeed;