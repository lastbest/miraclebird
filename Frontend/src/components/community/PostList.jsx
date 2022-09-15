import React from "react";
import { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import CommonTableColumn from "./CommonTableColumn";
import CommonTableRow from "./CommonTableRow";
import { postList } from "./PostData";
import Modal from 'react-bootstrap/Modal';

const PostList = props => {
    const [dataList, setDataList] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        setDataList(postList);
    },[])

    return (
        <>
        <CommonTable headersName={['글번호', '제목', '날짜', '조회수']}>
            {
            dataList ? dataList.map((item, index) => {
                return (
                <CommonTableRow key={index}>
                    <CommonTableColumn>{ item.no }</CommonTableColumn>
                    <CommonTableColumn onClick={handleShow}>{ item.title }</CommonTableColumn>
                    <CommonTableColumn>{ item.createDate }</CommonTableColumn>
                    <CommonTableColumn>{ item.readCount }</CommonTableColumn>
                </CommonTableRow>
                )
            }) : ''
            }
        </CommonTable>

        <Modal
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    hi
                    {/* {dataList.map((item)=>{
                        {item.title}
                    })} */}
                </Modal.Body>
            </Modal>
        </>
    )
};

export default PostList;