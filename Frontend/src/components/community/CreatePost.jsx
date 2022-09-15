import { axisBottom } from "d3";
import React, {useState} from "react";
import styles from "./CreatePost.module.css"
import axios from "axios";
import { useEffect } from "react";


function CreatePost () {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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

    return (
        <>
        <div className={styles.header}>
            <button className={styles.backbtn} onClick={()=>{document.location.href="/Challenge/Community"}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
        </div>
        <div className={styles.Form}>
            <div className={styles.titleForm}>
                제목
                <input className={styles.title} type="text" placeholder ="제목" name="title" onInput={(e)=>{setTitle(e.target.value)}} />
            </div>
            <div className={styles.contentForm}>
                내용
                <textarea className={styles.textarea} placeholder="내용" name="content" onInput={(e)=>{setContent(e.target.value)}} />
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
            }}>작성</button>
        </div>
        </>
    )
};

export default CreatePost;