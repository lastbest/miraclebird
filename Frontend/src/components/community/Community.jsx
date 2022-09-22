import React,{useEffect, useState} from "react";
import styles from './Community.module.css'
import PostMain from "./PostMain";
import PostList from "./PostList";
import {useNavigate} from "react-router-dom";

function Community () {
    const navigate = useNavigate();
    
    return (
        <>
        <div className={styles.header}>
            <button className={styles.backbtn} onClick={()=>{navigate("/")}}><img alt="back" src="/back.png" className={styles.backicon} /></button>
            <div className={styles.communitytext}>커뮤니티</div>
            <button className={styles.createbtn} onClick={()=>{navigate("/community/create")}}><img alt="pencil" src="/pencil.png" className={styles.pencilicon} /></button>
        </div>
        <PostMain />
        </>
    )
};

export default Community;