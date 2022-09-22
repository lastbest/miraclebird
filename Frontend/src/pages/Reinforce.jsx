import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import styles from './Reinforce.module.css';
import Lottie from "lottie-react";
// import lightEffectAniamition from "../components/animation/light-effect.json";
// import shimmerEffect from "../components/animation/shimmer.json"
import shimmerEffect from "../components/animation/shimmer2.json"
import levelUp from "../components/animation/levelup2.json"
import coin from "../components/animation/coin.json"
import arrow from "../components/animation/arrow.json"

function Reinforce () {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [level, setLevel] = useState('');
    const [idx, setIdx] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const NFT_SELECT =[
        {nfturl:'./nft1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftdetail:'롯데타워(5강)은 어쩌구저쩌구', nftprice:'10', 'onsale':0, level:5,},
        {nfturl:'./nft2.png', nickname:'이싸피', nftname:'롯데타워 1강', nftdetail:'롯데타워(1강)은 어쩌구저쩌구', nftprice:'12', 'onsale':1, level:1,},
        {nfturl:'./nft1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftdetail:'롯데타워(5강)은 어쩌구저쩌구', nftprice:'10', 'onsale':0, level:5,},
        {nfturl:'./nft2.png', nickname:'이싸피', nftname:'롯데타워 1강', nftdetail:'롯데타워(1강)은 어쩌구저쩌구', nftprice:'12', 'onsale':1, level:1,},
        {nfturl:'./nft1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftdetail:'롯데타워(5강)은 어쩌구저쩌구', nftprice:'10', 'onsale':0, level:5,},
        {nfturl:'./nft2.png', nickname:'이싸피', nftname:'롯데타워 1강', nftdetail:'롯데타워(1강)은 어쩌구저쩌구', nftprice:'12', 'onsale':1, level:1,},
        {nfturl:'./nft1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftdetail:'롯데타워(5강)은 어쩌구저쩌구', nftprice:'10', 'onsale':0, level:5,},
        {nfturl:'./nft2.png', nickname:'이싸피', nftname:'롯데타워 1강', nftdetail:'롯데타워(1강)은 어쩌구저쩌구', nftprice:'12', 'onsale':1, level:1,},
    ]
    const cardEl = useRef();
    const onButtonClick = () => {
        if ( cardEl.current.style.transform === "") {
            cardEl.current.style.transform = "rotateY(720deg)";
        } else {
            cardEl.current.style.transform = "";
        }
        
    }

    const upgradePercent = [
        90,75,60,45,30,10
      ];

    const upgradeBtn = () => {
        setLoading(true);
        setTimeout(()=>{
            let random_num = Math.floor(Math.random()*101);
            setLoading(false);
            if (random_num <= upgradePercent[level]) {
                handleShow()
                
                return ;
            } else {
                handleShow2()
                return ;
            }
        }, 2000)
    }

    return (
        <>
        <button className={styles.backbtn} onClick={()=>{navigate("/mypage")}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
        {/* <Lottie animationData={lightEffectAniamition} loop={true}/> */}
        <div className={styles.nftCt}>
            <div className={styles.nftImgCt}>
                { address === "" ? 
                <>
                <img alt="nft" src='/background.png' className={styles.background} />
                <div className={styles.nfttext}>강화할 NFT를 선택해주세요!</div>
                </>
                :
                <>
                {loading ? 
                <div className={styles.effectCt}>
                    <Lottie animationData={coin} className={styles.lottie} />
                </div>

                    :
                <>

                <div className={styles.flip}>
                    <div className={styles.shimmer}>
                        <Lottie animationData={shimmerEffect} loop={true} className={styles.shimmereffect} />
                    </div>
                    <div className={styles.card} ref={cardEl}>
                        <img alt="nft1" src={address} className={styles.selectnft} />
                        <img alt="nft2" src="/silverback.png" className={styles.back} />
                    </div>
                </div>
                
                </>
                    }
                    <div className={styles.leveltext}>
                    <div className={styles.numbertext}>{level}강</div>
                    <div className={styles.arrowCt}>
                        <Lottie animationData={arrow} loop={true} className={styles.arrows} />
                    </div>
                    {/* <div className={styles.arrowoptions} >
                        <div className={styles.arrowAnim}>
                            <div className={styles.arrowSliding}>
                                <div className={styles.arrow}></div>
                            </div>
                            <div className={styles.arrowSliding_delay1}>
                                <div className={styles.arrow}></div>
                            </div>
                            <div className={styles.arrowSliding_delay2}>
                                <div className={styles.arrow}></div>
                            </div>
                            <div className={styles.arrowSliding_delay3}>
                                <div className={styles.arrow}></div>
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.numbertext}>{level+1}강</div>
                </div>
                <div className={styles.levelbtnct}>
                    <button className={styles.levelbtn} onClick={upgradeBtn}>강화하기</button>
                </div>
                </>
                }

            </div>
        </div>

        <div className={styles.nftsCt}>
            <div className={styles.nftsImgCt}>
                {
                    NFT_SELECT.map((nft, index) => {
                        return (
                                <img alt="nft1" src={nft.nfturl} className={styles.nfturl} key={index} onClick={()=>(setAddress(nft.nfturl), setLevel(nft.level), setIdx(nft.index))} />
                        )
                    })
                }
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
                강화에 성공했습니다!
            </Modal.Body>
        </Modal>

        <Modal
            centered
            show={show2}
            onHide={handleClose2}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className={styles.modalheader} closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modalcontent} closeButton>
                강화에 실패했습니다.
            </Modal.Body>
        </Modal>
        </>
    )
}

export default Reinforce;