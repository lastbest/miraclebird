import React from "react";
import { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import CommonTableColumn from "./CommonTableColumn";
import CommonTableRow from "./CommonTableRow";
import { postList } from "./PostData";

import styles from "./PostList.module.css";
import { Link } from "react-router-dom";

const PostList = (props) => {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    setDataList(props.postData);
    console.log(props.postData);
  }, [props.postData]);

  let result = [];
  for (var i = 0; i < props.postData.length; i++) {
    var item = props.postData[i];
    result.push(
      <CommonTableRow key={item}>
        <div className={styles.tableRow}>
          {item.userRole == "USER" ? (
            <CommonTableColumn className={styles.title}>
              <Link
                to={`/community/${item.postIdx}`}
                className={styles.titletext2}>
                [공지사항] {item.title}
              </Link>
            </CommonTableColumn>
          ) : (
            <CommonTableColumn className={styles.title}>
              <Link
                to={`/community/${item.postIdx}`}
                className={styles.titletext}>
                {item.title}
              </Link>
            </CommonTableColumn>
          )}
          <div className={styles.readCount}>
            <img src="/view.png" alt="view" className={styles.viewicon} />
            <div className={styles.counttext}>{item.hit}</div>
          </div>
        </div>
        <div className={styles.tableRow2}>
          <div className={styles.datename}>
            <div className={styles.createDate}>
              {item.regtime[0]}-{item.regtime[1]}-{item.regtime[2]}
            </div>
          </div>
          <div className={styles.nickname}>
            <img alt="profile" src="src/assets/icon/profile_default.jpg" />
            회원{item.userIdx}
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
