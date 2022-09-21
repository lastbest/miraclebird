import React,{useState, useRef} from "react";
import styles from "./MyPage.module.css"
import Modal from "react-bootstrap/Modal";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from 'react-tooltip';
import "./Mypage.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MypageFeed from "../components/common/MypageFeed";

function MyPage () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef(null)
    let [write, setWrite] = useState("")
    let [sell, setSell] = useState("")
    let [sale, setSale] = useState("")
    let [credentials, setCredentials] = useState("김싸피");
    let [idx, setIdx] = useState(0);
    const navigate = useNavigate();

    const onChange = (e) => {
        if(e.target.files[0]){
                setImage(e.target.files[0])
            }else{
                setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                return
            }

            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }

    const SEOSON_SELECT = [
        {key:0, season:1, startDate:'2022-09-01', endDate:'2022-09-31', 
        values:[{ date: "2022-09-03", count: 1 },
                { date: "2022-09-04", count: 2 },
                { date: "2022-09-05", count: 3 },
                { date: '2022-09-08', count: 1 },
                { date: '2022-09-09', count: 2 },
                { date: '2022-09-10', count: 3 },
                { date: '2022-09-11', count: 2 },
                { date: '2022-09-12', count: 1 },
                { date: '2022-09-13', count: 3 },
        ]},
        {key:1, season:2, startDate:'2022-10-01', endDate:'2022-10-31', 
        values:[{ date: "2022-10-03", count: 1 },
                { date: "2022-10-04", count: 2 },
                { date: "2022-10-05", count: 3 },
                { date: '2022-10-08', count: 1 },
                { date: '2022-10-09', count: 2 },
                { date: '2022-10-10', count: 3 },
                { date: '2022-10-11', count: 2 },
                { date: '2022-10-12', count: 1 },
                { date: '2022-10-13', count: 3 },
                { date: '2022-10-14', count: 1 },
                { date: '2022-10-16', count: 2 },
                { date: '2022-10-17', count: 2 },
        ]},
        {key:2, season:3, startDate:'2022-11-01', endDate:'2022-11-30', 
        values:[{ date: "2022-11-03", count: 1 },
                { date: "2022-11-04", count: 2 },
                { date: "2022-11-05", count: 3 },
                { date: '2022-11-08', count: 1 },
                { date: '2022-11-11', count: 2 },
                { date: '2022-11-12', count: 1 },
                { date: '2022-11-13', count: 3 },
                { date: '2022-11-14', count: 1 },
                { date: '2022-11-16', count: 2 },
                { date: '2022-11-17', count: 2 },
                { date: '2022-11-20', count: 1 },
                { date: '2022-11-21', count: 2 },
                { date: '2022-11-22', count: 1 },
                { date: '2022-11-23', count: 3 },
        ]},
    ]

    const NFT_SELECT =[
        {nfturl:'./nft1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftdetail:'롯데타워(5강)은 어쩌구저쩌구', nftprice:'10', 'onsale':0,},
        {nfturl:'./nft2.png', nickname:'이싸피', nftname:'롯데타워 1강', nftdetail:'롯데타워(1강)은 어쩌구저쩌구', nftprice:'12', 'onsale':1,},
    ]

    return (
        <>
        <div className={styles.btns}>
            <button className={styles.logout} onClick={()=>handleShow5()}>로그아웃</button>
            <button className={styles.connect} onClick={()=>handleShow()}>CONNECT</button>
        </div>
        <div className={styles.profile}>
            <div className={styles.profileimg}>
                <img
                    src={Image} 
                    className={styles.profileupload}
                    onClick={()=>{fileInput.current.click()}} />
                <input 
                type='file' 
                    style={{display:'none'}}
                    accept='image/jpg,impge/png,image/jpeg' 
                    name='profile_img'
                    onChange={onChange}
                    ref={fileInput}/>
                <div className={styles.nicknamebox}>
                    <div className={styles.nickname}>{credentials}</div>
                    <button className={styles.pencilbtn} onClick={handleShow2}>
                        <img src="/pencil.png" alt="pencil" className={styles.pencil}/>
                    </button>
                </div>
            </div>
            <div className={styles.profiledetail}>
                <div className={styles.detail1}>
                    <div className={styles.nftnumber}>3</div>
                    <div className={styles.nfttext}>보유 NFT</div>
                </div>
                <div className={styles.detail2}>
                    <div className={styles.mira}>100</div>
                    <div className={styles.miratext}>보유 MIRA</div>
                    </div>
                <div className={styles.detail3}>
                    <div className={styles.rank}>58</div>
                    <div className={styles.ranktext}>현재 등수</div>
                </div>

            </div>
        </div>
        <div>
            <select className={styles.selectBox} onChange={(e)=>(setIdx(e.target.value))}>
                {
                SEOSON_SELECT.map((item) => {
                    return (
                    <option key={item.key} value={item.key}>시즌 {item.season}</option>
                    )
                })
                }
            </select>
            
            <div className={styles.heatmapcontainer}>
                <CalendarHeatmap
                    startDate={SEOSON_SELECT[idx].startDate}
                    endDate={SEOSON_SELECT[idx].endDate}
                    horizontal={false}
                    showMonthLabels={false}

                    values={SEOSON_SELECT[idx].values}

                    classForValue={(value) => {
                        if (!value) {
                        return "color-empty";
                        }
                        return `color-scale-${value.count}`;
                    }}
                    
                    // tooltipDataAttrs={(value) => {
                    //     if (!value || !value.date) {
                    //     return null;
                    //     }
                    //     return {
                    //     "data-tip": `${value.date} has count: ${
                    //         value.count
                    //     }`,
                    //     };
                    // }}
                    />
                {/* <ReactTooltip className={styles.tooltip} /> */}
            </div>
        </div>
        <div className={styles.nftContainer}>
            <div className={styles.text1}>
                    보유 NFT
            </div>
            <div className={styles.nftImg}>
                <Swiper
                modules={Navigation}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                className={styles.swiper}
                >
                    {
                    NFT_SELECT.map((nft, index) => {
                        return (
                            useEffect(()=>{
                                setSale(nft.nftprice)
                            }),
                            <SwiperSlide className={styles.nftslide}>
                                <div className={styles.nftImgContainer}>
                                    <img alt="nft1" src={nft.nfturl} className={styles.nfturl} />
                                </div>
                                <div className={styles.nftcard}>
                                    <div className={styles.nftname}>{nft.nftname}</div>
                                    <div className={styles.nftdetail}>{nft.nftdetail}</div>
                                    <div className={styles.miraprice}>
                                        <img alt="mira" src="/mira.png" className={styles.miraicon} />
                                        <div className={styles.nftprice}>{nft.nftprice}</div>
                                    </div>
                                    <div className={styles.btnContainer}>
                                        <button className={styles.btnReinforce} onClick={() =>{navigate("/reinforce");}}>강화</button>
                                        {nft.onsale === 0 ? <button className={styles.btnSell} onClick={()=>handleShow3()}>판매</button>
                                        :
                                        <button className={styles.btnonsale} onClick={()=>handleShow4(true)}>판매중</button>
                                        }
                                        
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                    }
                </Swiper>
            </div>
        </div>

        <div className={styles.challengeCt}>
            <MypageFeed />
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
                <img alt="metamaskfox" src="/MetaMaskFox.png" className={styles.metamask} />
                <button className={styles.metamaskbtn}>연결하기</button>
            </Modal.Body>
        </Modal>
        
        
        <Modal
            centered
            show={show2}
            onHide={handleClose2}
            backdrop="static"
            keyboard={false}
            className={styles.modal2}
        >
            <Modal.Header className={styles.modalheader} closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modalcontent2} closeButton>
            <div className={styles.nicknamechange}>닉네임변경</div>
                <div className={styles.nicknamecontainer}>
                    <input 
                    autoComplete="nickname"
                    name="nickname"
                    className={styles.nicknameinput}
                    placeholder="닉네임"
                    onInput={(event)=>{
                        setWrite(event.target.value);
                    }} />
                    <button onClick={()=>{
                        setCredentials((credentials = write))  
                        handleClose2
                    }}
                    className={styles.nicknamebtn}>변경하기</button>
                </div>
            </Modal.Body>
        </Modal>
        
        <Modal
            centered
            show={show3}
            onHide={handleClose3}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className={styles.modalheader} closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modalcontent3} closeButton>
                <div className={styles.sellprice}>판매가격</div>
                    <div className={styles.pricecontainer}>
                        <input 
                        autoComplete="price"
                        name="price"
                        className={styles.priceinput}
                        placeholder="판매가"
                        onInput={(event)=>{
                            setSell(event.target.value);
                        }} />
                        <button onClick={()=>{
                            console.log(sell)
                            handleClose3
                        }}
                        className={styles.sellbtn}>판매하기</button>
                </div>
            </Modal.Body>
        </Modal>

        <Modal
            centered
            show={show4}
            onHide={handleClose4}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className={styles.modalheader} closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modalcontent4} closeButton>
                <div className={styles.sellprice}>판매가격</div>
                <div className={styles.pricecontainer}>
                    <input 
                    autoComplete="price"
                    name="price"
                    className={styles.priceinput}
                    placeholder={sale}
                    onInput={(event)=>{
                        setSell(event.target.value);
                    }} />
                    <button onClick={()=>{
                        console.log(sell)
                        handleClose4(false)
                    }}
                    className={styles.sellbtn}>수정하기</button>
                </div>
            </Modal.Body>
        </Modal>

        <Modal
            centered
            show={show5}
            onHide={handleClose5}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className={styles.modalheader} closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modalcontent5} closeButton>
                로그아웃하시겠습니까?
                <div className={styles.btnCt}>
                    <button className={styles.backbtn} onClick={()=>handleClose5()}>돌아가기</button>
                    <button className={styles.logoutbtn}>로그아웃</button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default MyPage;