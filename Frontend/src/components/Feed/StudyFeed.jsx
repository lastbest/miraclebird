import React, {useState} from "react";
import styles from './StudyFeed.module.css'
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import Lottie from "lottie-react";
import heartEffect from "../../components/animation/heart.json"

function StudyFeed () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const heartBtn = () => {
        
        if (like === false) {
            setLoading(true);
            setLike(true)
            setTimeout(()=>{
                setLoading(false);
            }, 1300)
            
        } else {
            setLike(false)
        }

    }

    return (
        <>
        <div className={styles.feedHeader}>
            <button className={styles.backbtn} onClick={()=>(navigate('/challenge/study'))}><img alt="back" src="/back.png" className={styles.backicon} /> Study</button>
        </div>
        <div className={styles.feeds}>
            <div className={styles.feed}>
                <img src="/study.jpg" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/study.jpg" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/study.jpg" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/study.jpg" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/study.jpg" alt="mm" className={styles.picture} onClick={handleShow}/>
            </div>
            <div className={styles.feed}>
                <img src="/study.jpg" alt="mm" className={styles.picture} onClick={handleShow}/>
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
                <img src="/study.jpg" alt="mm" className={styles.picture2}  onDoubleClick={()=>(heartBtn())}/>
                { loading ? 
                <div>
                    <Lottie animationData={heartEffect} className={styles.lottie} loop={false} />
                </div> 
                :
                <div>
                </div>
                }
                <button className={styles.reportbtn}><img alt="siren" src="/siren.png" className={styles.sirenicon} />신고하기</button>
                <div className={styles.detail}>
                    <div>닉네임</div>
                    <div>시즌1 스터디</div>
                    <div>2022/09/08</div>
                </div>
                <div>
                    <button className={styles.heartbtn} onClick={()=>(heartBtn())}>
                    { like ?
                    <img alt="heart" src="/heartcolor.png" className={styles.heartIcon} />
                    :
                    <img alt="heart" src="/heart.png" className={styles.heartIcon} />
                    } 좋아요</button>
                </div>
            </Modal.Body>
            <Modal.Footer className={styles.modalheader}>
            </Modal.Footer>
        </Modal>

        </>
    )
}

export default StudyFeed;