import React, { useState } from "react";
// import { useState } from 'react';
import styles from "./Admin.module.css";
import "./Admin.css";
import AdminChallenge from "../components/common/AdminChallenge";
import AdminReport from "../components/common/AdminReport";
import ABI from '../common/ABI';
import Web3 from 'web3';
import getAddressFrom from '../util/AddressExtractor';
// import axios from 'axios';



function Admin() {
  const [view, setView] = useState(1);
  const [privKey, setPrivKey] = useState('');
  const web3 = new Web3(new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`));

  const handlePrivKey = (e) => {
    setPrivKey(e.target.value);
  };

  async function transferToken() {
    const address = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );

    if (!address) return;
    try {

      const sender = web3.eth.accounts.privateKeyToAccount(privKey);
      web3.eth.accounts.wallet.add(sender);
      console.log("wallet",web3.eth.accounts.wallet);
      web3.eth.defaultAccount = sender.address;
      console.log("defaultAccount ::", web3.eth.defaultAccount);
      console.log("sender",sender);

      const senderAddress = web3.eth.defaultAccount;
      console.log("senderAddress", senderAddress);
      
      const sendMira = new web3.eth.Contract(
        ABI.CONTRACT_ABI.ERC_ABI,
        "0x2cF81C7B6339cCB0e443b7A51cD6E701D91C92dD"
      );
      sendMira.methods.transfer("0xD86B88fCfabFD13FA64F2D8026Ef692370A0d191", 5)
        .send({
          from: senderAddress,
          gas: 3000000
        }).then(receipt=>{console.log("receipt::::",receipt)});

      // const response = await sendMira.methods
      //   .transfer("0xD86B88fCfabFD13FA64F2D8026Ef692370A0d191", 5)
      //   .send({ from: senderAddress, gas: 3000000 });
      // console.log("=============")
      
      // console.log("여기",response);
      // console.log("=============")
      // await sendMira
      //   .getPastEvents("Transfer", { fromBlock: "latest" })
      //   .then((result) => {
      //     console.log("await sendMira getPastEvents", result);
      //     const evt = result.slice(-1);
      //     console.log(evt);

          
        

      //   })
      
      

    } catch (error) {
      console.log(error)
      
    }
    
  }

  return (
    <>
      <div className={styles.btnCt}>
        <button
          className={`challengeBtn ${view === 1 ? "active" : ""}`}
          onClick={() => setView(1)}>
          챌린지
        </button>
        <button
          className={`challengeBtn ${view === 2 ? "active" : ""}`}
          onClick={() => setView(2)}>
          신고
        </button>
        <button
          className={`reportBtn ${view === 3 ? "active" : ""}`}
          onClick={() => setView(3)}>
          민팅
        </button>
        <button
          onClick={transferToken}> 
          test
        </button>
      </div>
      <div className={styles.component}>
        {view === 1 ? <AdminChallenge /> : ""}
        {view === 2 ? <AdminReport /> : ""}
        {view === 3 ? <LandmarkRegistration /> : ""}
      </div>

      <div>
          
            
              <div direction="row" sx={{ mt: 3 }}>
                <textarea
                  type="text"
                  label="개인키"
                  onChange={handlePrivKey}
                  value={privKey}
                  placeholder="개인키를 입력하세요"
                />
              </div>
              
            
        
        
        </div>
    </>
  );
}

export default Admin;
