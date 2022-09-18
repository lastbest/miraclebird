import React, {useState} from "react";
import styles from "./Animation.module.css";
import { fadeIn } from 'react-animations';

function Animation () {
    const [mount, setMount] = useState(false)
    const [effect, setEffect] = useState('mount1');

    const onClickBtn = () => {
        if (mount) {
            setEffect('unmount');
            setTimeout(()=>{
                setMount(v=> !v);
            },400)
        } else {
            setEffect('mount1');
            setMount(v=>!v);
        }
    };

    return (
        <>
        <button type="button" onClick={onClickBtn}>mount</button>
        {mount ?
        <div className={styles.mount1}>
            <img alt="nft1" src="/nft1.png"/>
        </div>
        :
        <></>
        }

        <div class={styles.flip}>  
            <div class={styles.card}>
                <div class={styles.front}><img alt="nft1" src="/nft1.png"/></div>
                <div class={styles.back}><img alt="nft2" src="/nft2.png"/></div>
            </div>
        </div>

        
        </>
    )
};

export default Animation;