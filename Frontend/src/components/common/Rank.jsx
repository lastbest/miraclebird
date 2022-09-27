import React, {useState} from "react";
import styles from "./Rank.module.css";
import Modal from 'react-modal';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import RankDay from "./RankDay";
import RankCount from "./RankCount"
import "./Rank.css"

SwiperCore.use([Navigation, Pagination, Autoplay])

function Rank() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rank, setRank] = useState(0);

    return (
        <>
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.rankcontainer}>
                    <img alt="rank" src="/rank.png" className={styles.rankicon}/>

                    <div className={styles.ranktext} onClick={()=>setModalIsOpen(true)}>챌린지 랭킹</div>
                </div>
            </div>
            <div className={styles.text}>
                이번 시즌 실시간 챌린지 랭킹
            </div>
            <div className={styles.slidecontainer}>
                <div className={styles.btnCt}>
                    <button onClick={()=>(setRank(0))} className={`rankbtn ${rank === 0 ? 'rankactive' : ''}`}>지속일</button>
                    <button onClick={()=>(setRank(1))} className={`rankbtn ${rank === 1 ? 'rankactive' : ''}`}>최다인증</button> 
                </div>
                { rank === 0 ? <RankDay /> : "" }
                { rank === 1 ? <RankCount /> : "" }
            </div>
        </div>
        <div className={styles.content2}>
            <div className={styles.header}>
                <img alt="nft" src="/nftenhance.png" className={styles.nfticon}/>
                <div className={styles.ownertext}>NFT OWNER</div>
            </div>
            <div className={styles.nftcontainer}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{delay:5000}}
                >
                    <SwiperSlide className={styles.nftslide}>
                        <img alt="nft1" src='./nft1.png' />
                        <p className={styles.nfttext}>owner by 김싸피</p>
                    </SwiperSlide>
                    <SwiperSlide className={styles.nftslide}>
                        <img alt="nft2" src='./nft2.png' />
                        <p className={styles.nfttext}>owner by 이싸피</p>
                    </SwiperSlide>
                </Swiper>
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