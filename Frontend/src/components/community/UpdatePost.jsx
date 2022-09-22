import React, {useState, useEffect} from "react";
import styles from "./UpdatePost.module.css"
import axios from "axios";
import { getPostByNo } from './PostData';
import { useParams } from 'react-router-dom';


function UpdatePost () {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [ data, setData ] = useState({});
    const { no } = useParams();
    useEffect(()=> {

    })
    const getValue = e => {
        const {name, value} = e.target;
        SetCommunity({
            ...Community,
            [name]:value
        })
    }

    const getValue2 = e => {
        const {name, value} = e.target;
        SetCommunity({
            ...Community,
            [name]:value
        })
        console.log(Community)
    }

    useEffect(() => {
        setData(getPostByNo(no));
      }, [ ]);

    return (
        <>
        <div className={styles.header}>
            <button className={styles.backbtn} onClick={()=>{history.back()}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
        </div>
        <div className={styles.Form}>
            {/* <select className={styles.selectBox}>
                <option key="notice" value="notice">
                    공지사항
                </option>
                <option key="talk" value="talk">
                    잡담
                </option>
                <option key="etc" value="etc">
                    기타
                </option>
            </select> */}
            <div className={styles.titleForm}>
                제목
                <input className={styles.title} type="text" placeholder ="제목" name="title" onInput={(e)=>{setTitle(e.target.value)}} value={data.title} />
            </div>
            <div className={styles.contentForm}>
                내용
                <textarea className={styles.textarea} placeholder="내용" name="content" onInput={(e)=>{setContent(e.target.value)}} value={data.content}/>
            </div>
        </div>
        <div className={styles.btnForm}>
            <button className={styles.submitbtn} onClick={()=>{
                axios({
                    url:"",
                    method:"post",
                    data: {
                        title:title,
                        content:content,
                    },
                })
                    .then((res)=>{
                        console.log(res.data.result)
                    })
            }}>수정하기</button>
        </div>
        </>
    )
};

export default UpdatePost;