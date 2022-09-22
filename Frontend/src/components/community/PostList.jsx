import React from "react";
import { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import CommonTableColumn from "./CommonTableColumn";
import CommonTableRow from "./CommonTableRow";
import { postList } from "./PostData";

import styles from './PostList.module.css'
import { Link } from "react-router-dom";


const PostList = props => {
    const [dataList, setDataList] = useState([]);
    useEffect(()=>{
        setDataList(postList);
    },[])

    return (
        <>
        
        <div className={styles.tableContainer}>
            <CommonTable headersName={[]}>
            {/* <CommonTable headersName={['No', '제목', '날짜', '♡']}> */}
                {
                dataList ? dataList.map((item, index) => {
                    return (
                    <CommonTableRow key={index}>
                        <div className={styles.tableRow}>
                            { item.category === 1 ?
                            <CommonTableColumn className={styles.title}>
                                <Link to={`/community/${item.no}`} className={styles.titletext2}>[공지사항] { item.title }</Link>
                            </CommonTableColumn>
                            : 
                            <CommonTableColumn className={styles.title}>
                                <Link to={`/community/${item.no}`} className={styles.titletext}>{ item.title }</Link>
                            </CommonTableColumn>
                            }
                            <div className={styles.readCount}>
                                <img src="/view.png" alt="view" className={styles.viewicon}/>
                                <div className={styles.counttext}>{ item.readCount }</div>
                            </div>
                        </div>
                        <div className={styles.tableRow2}>
                            <div className={styles.datename}>
                                <div className={styles.createDate}>{ item.createDate }</div>
                            </div>
                            <div className={styles.nickname}><img alt="profile" src={item.profileurl}/>{ item.nickname }</div>
                            {/* <CommonTableColumn className={styles.no}>#{ item.no }</CommonTableColumn> */}
                        </div>
                    </CommonTableRow>
                    )
                }) : ''
                }
            </CommonTable>
        </div>
        </>
    )
};

export default PostList;