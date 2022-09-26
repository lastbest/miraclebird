import React, {useState} from "react";
import styles from "./AdminReport.module.css"
import Modal from "react-bootstrap/Modal"

function AdminReport () {
    const POST_SELLECT = [
        {nickname: "정싸피", date:"2022-09-25", category: 1, imgUrl:"/miraclemorning.png", count:3},
        {nickname: "이싸피", date:"2022-09-25", category: 2, imgUrl:"/health.jpg", count:5, },
        {nickname: "박싸피", date:"2022-09-25", category: 3, imgUrl:"/study.jpg", count:1, },
        {nickname: "김싸피", date:"2022-09-25", category: 1, imgUrl:"/miraclemorning.png", count:10},
    ]

    const [img, setImg] = useState("")
    const [nickname, setNickname] = useState("")
    const [date, setDate] = useState()
    const [count, setCount] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        <div className={styles.postCt}>
            {
                POST_SELLECT.map((post, index) => {
                    return (
                            <div className={styles.post} onClick={()=>(setImg(post.imgUrl), setNickname(post.nickname), setDate(post.date), setCount(post.count), handleShow())}>
                                {post.nickname} | {post.category === 1 ? "미라클모닝" : ""}{post.category === 2 ? "헬스" : ""}{post.category === 3 ? "스터디" : ""} | 신고횟수:{post.count}
                            </div>
                    )
                })
            }
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
            <Modal.Body className={styles.modalcontent}>
                    <img alt="post" src={img} className={styles.postImg} />
                    <div className={styles.text}>{nickname} {date} 신고횟수:{count}</div>
                    <div className={styles.btnCt}>
                        <button className={styles.passBtn}>보류</button>
                        <button className={styles.deleteBtn}>삭제</button>
                        <button className={styles.outBtn}>탈퇴</button>
                    </div>
            </Modal.Body>
            <Modal.Footer className={styles.modalheader}></Modal.Footer>
        </Modal>
        </>
    )
}

export default AdminReport;