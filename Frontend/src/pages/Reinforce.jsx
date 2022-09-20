import React, { useState, useEffect, useRef, Component } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Reinforce.module.css';


function Reinforce () {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [level, setLevel] = useState('');

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

    return (
        <>
        <button className={styles.backbtn} onClick={()=>{navigate("/mypage")}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
        
        <div className={styles.nftCt}>
            <div className={styles.nftImgCt}>
                { address === "" ? 
                <>
                <img alt="nft" src='/background.png' className={styles.background} />
                <div className={styles.nfttext}>강화할 NFT를 선택해주세요!</div>
                </>
                :
                <>
                <div className={styles.flip}>
                    <div className={styles.card} ref={cardEl}>
                        <img alt="nft1" src={address} className={styles.selectnft} />
                        <img alt="nft2" src="/silverback.png" className={styles.back} />
                    </div>
                </div>
                <div className={styles.leveltext}>
                    <div>{level}강</div>
                    <div className={styles.arrowoptions} >
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
                    </div>
                    <div>{level+1}강</div>
                </div>
                <div className={styles.levelbtnct}>
                    <button className={styles.levelbtn} onClick={onButtonClick}>강화하기</button>
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
                                <img alt="nft1" src={nft.nfturl} className={styles.nfturl} key={index} onClick={()=>(setAddress(nft.nfturl), setLevel(nft.level))} />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Reinforce;