import React,{useState, useRef} from "react";
import styles from "./MyPage.module.css"
import Modal from 'react-modal';
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from 'react-tooltip';
import "./Mypage.css"

function MyPage () {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef(null)
    let [write, setWrite] = useState("")
    let [credentials, setCredentials] = useState("김싸피");

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

    const SEOSON_SELECT = [{key:1, season:1},
    {key:2, season:2},
    {key:3, season:3},
    {key:4, season:4},
    {key:5, season:5},
    ]

    const SEOSON_HEATMAP_SELECT = [
        {key:1, startDate:'2022-09-01', endDate:'2022-09-31', values:[{ date: "2022-09-03", count: 1 },
        { date: "2022-09-04", count: 2 },
        { date: "2022-09-05", count: 3 },
        { date: '2022-09-08', count: 1 },
        { date: '2022-09-09', count: 2 },
        { date: '2022-09-10', count: 3 },
        { date: '2022-09-11', count: 2 },
        { date: '2022-09-12', count: 1 },
        { date: '2022-09-03', count: 3 },]}
    ]

    return (
        <>
        <div className={styles.btns}>
            <button className={styles.logout}>로그아웃</button>
            <button className={styles.connect} onClick={()=>setModalIsOpen(true)}>CONNECT</button>
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
                    <button className={styles.pencilbtn} onClick={()=>setModalIsOpen2(true)}>
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
            <select className={styles.selectBox}>
                {
                SEOSON_SELECT.map((item) => {
                    return <option key={item.key} value={item.season}>시즌 {item.season}</option>
                })
                }
            </select>
            <div className={styles.heatmapcontainer}>
                <div>
                    <CalendarHeatmap
                    startDate={new Date("2022-09-01")}
                    endDate={new Date("2022-09-31")}
                    horizontal={false}
                    showMonthLabels={false}
                    // monthLabels="none"

                    values={[
                        { date: "2022-09-03", count: 1 },
                        { date: "2022-09-04", count: 2 },
                        { date: "2022-09-05", count: 3 },
                        { date: '2022-09-08', count: 1 },
                        { date: '2022-09-09', count: 2 },
                        { date: '2022-09-10', count: 3 },
                        { date: '2022-09-11', count: 2 },
                        { date: '2022-09-12', count: 1 },
                        { date: '2022-09-03', count: 3 },
                    ]}

                    // color
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
                    {/* {
                    SEOSON_HEATMAP_SELECT.map((item) => {
                        return <CalendarHeatmap
                        startDate={new Date({item.startDate})}
                        endDate={new Date("2022-09-31")}
                        horizontal={false}
                        showMonthLabels={false}
                        // monthLabels="none"
    
                        values={[
                            { date: "2022-09-03", count: 1 },
                            { date: "2022-09-04", count: 2 },
                            { date: "2022-09-05", count: 3 },
                            { date: '2022-09-08', count: 1 },
                            { date: '2022-09-09', count: 2 },
                            { date: '2022-09-10', count: 3 },
                            { date: '2022-09-11', count: 2 },
                            { date: '2022-09-12', count: 1 },
                            { date: '2022-09-03', count: 3 },
                        ]}
    
                        classForValue={(value) => {
                            if (!value) {
                            return "color-empty";
                            }
                            return `color-scale-${value.count}`;
                        }}
                        
                        />
                    })
                    } */}
                     
                </div>
                {/* <ReactTooltip className={styles.tooltip} /> */}
            </div>
        </div>

        <Modal isOpen={modalIsOpen} appElement={document.getElementById('root') || undefined} className={styles.modal}>
            <div className={styles.modalHeader}> 
            <button onClick={()=>setModalIsOpen(false)} className={styles.closebtn}>X</button>
            </div>
            <div className={styles.modalcontent}>
                <img alt="metamaskfox" src="/MetaMaskFox.png" className={styles.metamask} />
                <button className={styles.metamaskbtn}>연결하기</button>
            </div>
 
        </Modal>
        
        
        <Modal isOpen={modalIsOpen2} appElement={document.getElementById('root') || undefined} className={styles.modal2}>
            <div className={styles.modalHeader2}> 
            <button onClick={()=>setModalIsOpen2(false)} className={styles.closebtn}>X</button>
            </div>
            <div className={styles.modalcontent2}>
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
                        setModalIsOpen2(false)
                    }}
                    className={styles.nicknamebtn}>변경하기</button>
                </div>
            </div>
 
        </Modal>
        </>
    )
}

export default MyPage;