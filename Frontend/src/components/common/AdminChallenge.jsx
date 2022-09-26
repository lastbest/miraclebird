import React,{useState} from "react";
import styles from "./AdminChallenge.module.css"
import Modal from "react-bootstrap/Modal"

function AdminChallenge () {

    const POST_SELLECT = [
        {nickname: "김싸피", date:"2022-09-25", category: 1, imgUrl:"/miraclemorning.png", deposit:0},
        {nickname: "이싸피", date:"2022-09-25", category: 2, imgUrl:"/health.jpg", deposit:1},
        {nickname: "최싸피", date:"2022-09-25", category: 3, imgUrl:"/study.jpg", deposit:0,},
        {nickname: "장싸피", date:"2022-09-25", category: 1, imgUrl:"/miraclemorning.png", deposit:1},
    ]

    const [img, setImg] = useState("")
    const [nickname, setNickname] = useState("")
    const [date, setDate] = useState()
    const [category, setCategory] = useState()
    const [deposit, setDeposit] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        <div className={styles.postCt}>
            {
                POST_SELLECT.map((post, index) => {
                    return (
                            <div className={styles.post} key={index} onClick={()=>(setImg(post.imgUrl), setNickname(post.nickname), setDate(post.date), setCategory(post.category), setDeposit(post.deposit), handleShow())}>
                                {post.nickname} | {post.date} | {post.category === 1 ? "미라클모닝" : ""}{post.category === 2 ? "헬스" : ""}{post.category === 3 ? "스터디" : ""}{post.deposit === 0 ? "" :" | 보증금"}
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
                    <div className={styles.text}>{nickname} {date}</div>
                    <div className={styles.btnCt}>
                        <button className={styles.accessBtn}
                        onClick={()=>{
                            if (category === 1 && deposit === 0) {
                                console.log(2)
                            } else if ( category === 1 && deposit === 1 ){
                                console.log(4)
                            } else if (category === 2 && deposit === 0) {
                                console.log(3)
                            } else if ( category === 2 && deposit === 1 ){
                                console.log(6)
                            } else if (category === 3 && deposit === 0) {
                                console.log(1)
                            } else if ( category === 3 && deposit === 1 ){
                                console.log(2)
                            }
                        }}>승인</button>
                        <button className={styles.deleteBtn}>거절</button>
                    </div>
            </Modal.Body>
            <Modal.Footer className={styles.modalheader}></Modal.Footer>
        </Modal>
        </>
    )
}

export default AdminChallenge;