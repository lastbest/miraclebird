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
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function Transaction() {
  return (
    <div>Transaction</div>
  )
}

export default Transaction