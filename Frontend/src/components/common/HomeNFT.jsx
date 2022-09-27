import React from "react";
import Modal from 'react-modal';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from './HomeNFT.module.css'


function HomeNFT () {
    return (
        <>
        <div className={styles.slidecontainer}>
            <Swiper
            spaceBetween={50}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            >
                <SwiperSlide className={styles.slide}>
                    <div className={styles.detailText}>
                        <div className={styles.detail1}>01</div>
                        <br />
                        <div className={styles.detail2}>원하는 지역의 랜드마크를 구매하세요.</div>
                        <div className={styles.iconCt2}>
                            <img alt="detail" src="/bank.png" className={styles.detailicon} />
                            <img alt="detail" src="/presentation.png" className={styles.detailicon} />
                        </div>
                        <div className={styles.detail3}>
                            스토어에서 원하는 지역의 랜드마크를 구매할 수 있어요.
                            <br />
                            구매한 랜드마크를 다른 유저에게 판매할 수 있어요.
                            <br />
                            지금 당장 랜드마크를 구매해보세요!
                        </div>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.detailText}>
                        <div className={styles.detail1}>02</div>
                        <br />
                        <div className={styles.detail2}>NFT를 강화해보세요.</div>
                        <div className={styles.iconCt2}>
                            <img alt="detail" src="/star.png" className={styles.detailicon} />
                            <img alt="detail" src="/trophy.png" className={styles.detailicon} />
                        </div>
                        <div className={styles.detail3}>
                            마이룸에서 내 랜드마크를 강화할 수 있어요.
                            <br />
                            7강까지 강화해보세요!
                            <br />
                            강화한 랜드마크도 판매할 수 있습니다.
                        </div>
                        
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
        </>
    )
}

export default HomeNFT;