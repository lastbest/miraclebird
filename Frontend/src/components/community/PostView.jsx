import React, { useEffect, useState } from 'react';
import { getPostByNo } from './PostData';
import styles from './PostView.module.css';
import { useParams } from 'react-router-dom';

const PostView = () => {
  const [ data, setData ] = useState({});

  const { no } = useParams();

  useEffect(() => {
    setData(getPostByNo(no));
  }, [ ]);

  return (
    <>
      
      <button className={styles.backbtn} onClick={()=>{history.back()}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
      <div className={styles.post_view_wrapper}>
        {
          data ? (
            <>
              <div className={styles.post_view_row}>
                <label>제목</label>
                <label>{ data.title }</label>
              </div>
              <div className={styles.post_view_row}>
                <label>작성일</label>
                <label>{ data.createDate }</label>
              </div>
              <div className={styles.post_view_row}>
                <label>조회수</label>
                <label>{ data.readCount }</label>
              </div>
              <div className={styles.post_view_row}>
                <label>내용</label>
                <div>
                  {
                    data.content
                  }
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        
      </div>
    </>
  )
}

export default PostView;