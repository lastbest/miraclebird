import React, {useState} from "react";
import styles from "./Rank.module.css";
import Modal from 'react-modal';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

SwiperCore.use([Navigation, Pagination, Autoplay])

function Rank() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.rankcontainer}>
                    <img alt="rank" src="/rank.png" className={styles.rankicon}/>
                    <p onClick={()=>setModalIsOpen(true)}>챌린지 랭킹</p>
                </div>
            </div>
            <div className={styles.slidecontainer}>
                <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{delay:5000}}
                >
                    <SwiperSlide className={styles.slide}>
                        <p className={styles.maintext}>챌린지 지속일</p>
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
                    </SwiperSlide>
                    <SwiperSlide className={styles.slide}>
                        <p className={styles.maintext}>챌린지 최다 인증</p>
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
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
        <div className={styles.content2}>
            <div className={styles.header}>
                <img alt="nft" src="/nftenhance.png" className={styles.nfticon}/>
                <h3>NFT OWNER</h3>
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