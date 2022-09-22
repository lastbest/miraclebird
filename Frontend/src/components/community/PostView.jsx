import React, { useEffect, useState } from 'react';
import { getPostByNo } from './PostData';
import styles from './PostView.module.css';
import { useParams } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const PostView = () => {
  const [ data, setData ] = useState({});

  const { no } = useParams();

  useEffect(() => {
    setData(getPostByNo(no));
  }, [ ]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <button className={styles.backbtn} onClick={()=>{history.back()}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
      <div className={styles.post_view_wrapper}>
        {
          data ? (
            <>
              <div className={styles.postTitle}>
                { data.title }
              </div>
              <div className={styles.postInfo}>
                <div className={styles.postInfoDate}>{ data.createDate } 조회수 { data.readCount }</div>
                <div className={styles.postInfoSub}>
                  <div className={styles.postInfoName}><img src={data.profileurl} alt="profile"/> {data.nickname}</div>
                  <div>
                    <Link to={`/community/update/${data.no}`} className={styles.titletext}><button className={styles.updatebtn}>수정</button></Link>
                    <button className={styles.deletebtn} onClick={()=>handleShow()}>삭제</button>
                  </div>
                </div>
              </div>
              <div className={styles.postContent}>
                <div>
                  {
                    data.content
                  }
                </div>
              </div>
              <div className={styles.postComment}>
                
                <div><img src="/chat.png" alt="comment" className={styles.commenticon}/>댓글</div>

              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          삭제하시겠습니까?
          <div className={styles.btnCt}>
            <button className={styles.deletebackbtn} onClick={()=>(handleClose())}>돌아가기</button>
            <button className={styles.deletedeletebtn}>삭제하기</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PostView;