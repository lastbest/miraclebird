import React from 'react';
import { useRef, useState } from 'react';
import COMMON_ABI from '../../common/ABI';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import Web3 from 'web3';
import getAddressFrom from '../../util/AddressExtractor';
import { NFTStorage } from 'nft.storage';
import { Form, FormikProvider, useFormik } from 'formik';
import styles from "./LandmarkRegistration.module.css"

const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0MTM5RkNDZmFFMkU5NDg0Q0VlZWM5YjZGZTViQWE1MUZiQjNEMGYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDA5NjE1ODQ2NCwibmFtZSI6Ik1pcmFjbGUgQmlyZCJ9.rQfvLFypmPXA7AzEOGCjS3lOEwCW1boihucZZ53U_hQ' })

function LandmarkRegistration() {

    const [item, setItem] = useState('');
    const [itemName, setItemName] = useState('');
    // const itemSelect = useRef();
    // const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [uri, setUri] = useState('');

    const [approveModal, setApproveModal] = useState(false);
    const [privKey, setPrivKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    // const [newLandmarkCard, setNewLandmarkCard] = useState('');

    const web3 = new Web3(new Web3.providers.HttpProvider(`http://20.196.209.2:8545`));

    // 찾기 버튼 클릭 핸들링
    // const handleClick = () => {
    //     itemSelect.current.click();
    // };

    // 아이템 업로드 핸들링
    const handleItem = (event) => {
        setItem(event.target.files[0]);
    };

    // 모달 핸들링 (등록 승인)
    const toggleApprove = () => {
        setApproveModal(!approveModal);
    };

    // 개인키 입력 핸들링
    const handlePrivKey = (e) => {
        setPrivKey(e.target.value);
    };


    const formik = useFormik({
        initialValues: {
          title: '',
          description: ''
        },
        onSubmit: (value) => {
          setTitle(value.itemName);
          setDescription(value.description);
        }
      });
    const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

    // URI Json 생성
    async function createURI() {
        const metadata = await client.store({
            name: itemName,
            description: description,
            image: item,
        })
        console.log(metadata)
        setUri(`https://${metadata.ipnft}.ipfs.nftstorage.link/metadata.json`)
    }

    // NFT 등록
    async function addItem() {
        const address = getAddressFrom(privKey.startsWith("0x") ? privKey : "0x" + privKey);
        console.log("address", address);
        if (!address) return;

        let formData = new FormData();
        formData.append("image", item);
        formData.append("title", itemName);
        formData.append("description", description);
        formData.append("address", address);

        try {
            // var result = await axios.post(`http://j7c107.p.ssafy.io:8080` + "/landmark", formData);
            // console.log(result)
            // console.log(result.data.result)
      
            // const storedItem = { landmarkId: result.data.landmarkIdx, link: uri };
            const storedItem = { link: uri };
      
            // make Contract
            const sender = web3.eth.accounts.privateKeyToAccount(privKey);
            web3.eth.accounts.wallet.add(sender);
            console.log(web3.eth.accounts.wallet)
            web3.eth.defaultAccount = sender.address;
            console.log("defaultAccount ::", web3.eth.defaultAccount);
      
            const senderAddress = web3.eth.defaultAccount;
      
            const landmarkNft = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.NFT_ABI, "0x89FbD3EB050594390D1187D24fDe0Fc9cfE3a37a");
      
            // NFT creation
            const response = await landmarkNft.methods.mintNFT(storedItem.link).send({ from: senderAddress, gas: 3000000 });
            console.log(response)
            // await landmarkNft.getPastEvents("Transfer", { fromBlock: "latest" }).then((result) => {
            //   console.log("ssafyNft getPastEvents", result);
            //   const evt = result[0];
      
            //   const tokenId = evt.returnValues.tokenId;
            //   setTokenId(tokenId);
      
            //   axios
            //     .patch(`https://j7c107.p.ssafy.io:8080` + `/landmark/${storedItem.landmarkId}`, {
            //       token_id: tokenId,
            //       owner_address: senderAddress,
            //     })
            //     .then((result) => {
            //       console.log(result);
            //       setIsComplete(true);
            //     })
            //     .catch((err) => console.log("Item patch error", err));
            // });
          } catch (err) {
            console.log("ERROR while adding item", err);
          }

    }

    return (
        <div className={styles.contentCt}>
            <div >주소: {}</div>
            <br/><br/>
            <input value={itemName}
                onChange = {(e) =>{
                        setItemName(e.target.value);
                    }
                }
                type="text"
                placeholder="name">
            </input>
            <br/>
            <input value={description}
                onChange = {(e) =>{
                        setDescription(e.target.value);
                    }
                }
                type="text"
                placeholder="description">
            </input>
            <br/>
            <input type="file" onChange={handleItem} />
            <br/>
            <br/>
            <button onClick={()=>{createURI()}}>URI 생성</button>
            <div >URI: {uri}</div>
            {uri ? <div>

              <FormikProvider value={formik}>
                <Form
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                >
                    <div direction="row" sx={{ mt: 3 }}>
                      <textarea
                        fullWidth
                        type="text"
                        label="개인키"
                        onChange={handlePrivKey}
                        value={privKey}
                        placeholder="개인키를 입력하세요"
                      />
                    </div>


                      <button
                        size="large"
                        variant="contained"
                        sx={{ ml: 3, width: '20%', fontSize: 16 }}
                        loading={loading}
                        onClick={addItem}
                      >
                        승인하기
                      </button>
                </Form>
              </FormikProvider>
          </div>
          :<div>uri가 등록되지 않았습니다</div>}

        </div>
    )


}

export default LandmarkRegistration