import React, {useState} from "react";
import styles from "./MypageFeed.module.css"
import Modal from 'react-modal';

function MypageFeed () {
    const SEOSON_SELECT = [
        {key:0, season:1, startDate:'2022-09-01', endDate:'2022-09-31', 
        values:[{ date: "2022-09-03", count: 1, url:"./miraclemorning.png" },
                { date: "2022-09-04", count: 2, url:"./health.jpg" },
                { date: "2022-09-05", count: 3, url:"./miraclemorning.png" },
                { date: '2022-09-08', count: 1, url:"./miraclemorning.png" },
                { date: '2022-09-09', count: 2, url:"./health.jpg" },
                { date: '2022-09-10', count: 3, url:"./miraclemorning.png" },
                { date: '2022-09-11', count: 2, url:"./study.jpg" },
                { date: '2022-09-12', count: 1, url:"./miraclemorning.png" },
                { date: '2022-09-13', count: 3, url:"./miraclemorning.png" },
        ]},
        {key:1, season:2, startDate:'2022-10-01', endDate:'2022-10-31', 
        values:[{ date: "2022-10-03", count: 1, url:"./study.jpg" },
                { date: "2022-10-04", count: 2, url:"./health.jpg" },
                { date: "2022-10-05", count: 3, url:"./miraclemorning.png" },
                { date: '2022-10-08', count: 1, url:"./miraclemorning.png" },
                { date: '2022-10-09', count: 2, url:"./study.jpg" },
                { date: '2022-10-10', count: 3, url:"./study.jpg" },
                { date: '2022-10-11', count: 2, url:"./miraclemorning.png" },
                { date: '2022-10-12', count: 1, url:"./study.jpg" },
                { date: '2022-10-13', count: 3, url:"./miraclemorning.png" },
                { date: '2022-10-14', count: 1, url:"./study.jpg" },
                { date: '2022-10-16', count: 2, url:"./study.jpg" },
                { date: '2022-10-17', count: 2, url:"./health.jpg" },
        ]},
        {key:2, season:3, startDate:'2022-11-01', endDate:'2022-11-30', 
        values:[{ date: "2022-11-03", count: 1, url:"./health.jpg"},
                { date: "2022-11-04", count: 2, url:"./study.jpg" },
                { date: "2022-11-05", count: 3, url:"./miraclemorning.png" },
                { date: '2022-11-08', count: 1, url:"./study.jpg" },
                { date: '2022-11-11', count: 2, url:"./study.jpg" },
                { date: '2022-11-12', count: 1, url:"./health.jpg" },
                { date: '2022-11-13', count: 3, url:"./study.jpg" },
                { date: '2022-11-14', count: 1, url:"./health.jpg" },
                { date: '2022-11-16', count: 2, url:"./miraclemorning.png" },
                { date: '2022-11-17', count: 2, url:"./study.jpg" },
                { date: '2022-11-20', count: 1, url:"./study.jpg" },
                { date: '2022-11-21', count: 2, url:"./study.jpg" },
                { date: '2022-11-22', count: 1, url:"./miraclemorning.png" },
                { date: '2022-11-23', count: 3, url:"./study.jpg" },
        ]},
    ]
    let [idx, setIdx] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        <select className={styles.selectBox} onChange={(e)=>(setIdx(e.target.value))}>
            {
            SEOSON_SELECT.map((item) => {
                return (
                <option key={item.key} value={item.key}>시즌 {item.season}</option>
                )
            })
            }
        </select>
        <div className={styles.feeds}>
            <div className={styles.list}>
                <button className={styles.listbtn} onClick={()=>setModalIsOpen(true)}><img src="/list.png" className={styles.listicon}></img></button>
            </div>
            <div className={styles.feedsImg}>
                <img src={SEOSON_SELECT[idx].values[0].url} className={styles.feedImg}/>
            </div>
        </div>

        <Modal isOpen={modalIsOpen} appElement={document.getElementById('root') || undefined} className={styles.modal}>
            <div className={styles.modalHeader}> 
            <button onClick={()=>setModalIsOpen(false)} className={styles.closebtn}>X</button>
            </div>
            <div className={styles.modalcontent}>
            {
            SEOSON_SELECT[idx].values.map((item) => {
                return (
                    <>
                    <img src={item.url} className={styles.feedImg}/>
                    <div className={styles.imgdate}>{item.date}</div>
                    </>
                )
            })
            }
            </div>
 
        </Modal>
        </>
    )
}

export default MypageFeed;
