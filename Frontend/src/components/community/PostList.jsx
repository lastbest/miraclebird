import React from "react";
import { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import CommonTableColumn from "./CommonTableColumn";
import CommonTableRow from "./CommonTableRow";
import { postList } from "./PostData";

import styles from "./PostList.module.css";
import { Link, useNavigate } from "react-router-dom";

const PostList = (props) => {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
    setDataList(props.postData);
    console.log(props.postData);
  }, [props.postData]);

  let result = [];
  for (var i = 0; i < props.postData.length; i++) {
    var item = props.postData[i];
    result.push(
      <CommonTableRow key={item}>
        <div className={styles.tableRow} onClick={() => {navigate(`/community/${item.postIdx}`)}}>
          {item.userRole == "ADMIN" ? (
            <tr className={styles.title} onClick={() => {
              console.log("click");
              useNavigate(`/community/${item.postIdx}`);
            }}>
              <Link
                to={`/community/${item.postIdx}`}
                className={styles.titletext2}>
                [공지사항] {item.title}
              </Link>
            </tr>
          ) : (
            <tr className={styles.title} onClick={() => {

              console.log("click");
              useNavigate(`/community/${item.postIdx}`);
            }}>
              <Link
                to={`/community/${item.postIdx}`}
                className={styles.titletext}>
                {item.title}
              </Link>
            </tr>
          )}
          <div className={styles.readCount}>
            <img src="/view.png" alt="view" className={styles.viewicon} />
            <div className={styles.counttext}>{item.hit}</div>
          </div>
        </div>
        <div className={styles.tableRow2} onClick={() => {navigate(`/community/${item.postIdx}`)}}>
          <div className={styles.datename}>
            <div className={styles.createDate}>
              {item.regtime[0]}-{item.regtime[1]}-{item.regtime[2]}
            </div>
          </div>
          <div className={styles.nickname}>
            {item.image_url == null ? <img alt="profile" src="src/assets/icon/profile_default.jpg" /> : <img alt="profile" src={item.image_url} />}

            {item.name}
          </div>
          {/* <CommonTableColumn className={styles.no}>#{ item.no }</CommonTableColumn> */}
        </div>
      </CommonTableRow>
    );
  }
  return (
    <>
      <div className={styles.tableContainer}>
        <CommonTable headersName={[]}>
          {/* <CommonTable headersName={['No', '제목', '날짜', '♡']}> */}
          {result}
        </CommonTable>
      </div>
    </>
  );
};

export default PostList;
