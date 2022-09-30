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
  useEffect(() => {
    setDataList(props.postData);
    console.log(props.postData);
  }, [props.postData]);
  var navigate = useNavigate();
  let result = [];
  for (var i = 0; i < props.postData.length; i++) {
    var item = props.postData[i];
    result.push(
      <div
        onClick={() => {
          console.log("click");
          navigate("/community/" + item.postIdx);
        }}>
        <CommonTableRow key={item}>
          <div className={styles.tableRow}>
            {item.userRole == "ADMIN" ? (
              <div className={styles.title}>
                <Link
                  to={`/community/${item.postIdx}`}
                  className={styles.titletext2}>
                  [공지사항] {item.title}
                </Link>
              </div>
            ) : (
              <div
                className={styles.title}
                onClick={() => {
                  console.log("click");
                  document.location.href = "/community/" + item.postIdx;
                }}>
                <Link
                  to={`/community/${item.postIdx}`}
                  className={styles.titletext}>
                  {item.title}
                </Link>
              </div>
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
              {item.image_url == null ? (
                <img alt="profile" src="src/assets/icon/profile_default.jpg" />
              ) : (
                <img alt="profile" src={item.image_url} />
              )}

              {item.name}
            </div>
            {/* <CommonTableColumn className={styles.no}>#{ item.no }</CommonTableColumn> */}
          </div>
        </CommonTableRow>
      </div>
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
