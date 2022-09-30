import React, { useState, useEffect } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";


const handleDragStart = (e) => e.preventDefault();

const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
};


const WebCarousel = () => {
    const [challengeImg, setChallengeImg] = useState([]);
    const [challengeMap, setChallengeMap] = useState([]);
    useEffect(()=>{
        axios({
            url:
              API_BASE_URL + "/verification/",
            method: "GET",
            headers: {
              Authorization: "Bearer " + NOW_ACCESS_TOKEN,
            },
          })
            .then((res) => {
              setChallengeImg(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
    },[]);

    useEffect(() => {
        var temp = [];
        for (var i = 0; i < challengeImg.length; i++) {
          var item = challengeImg[i];
          if (!item.share) continue;
          temp.push(
            <img src={item.selfie} alt="selfie"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation"></img>
          );
        }
        setChallengeMap(temp);
      }, );


    return (
        <>
        <div className="container" style={{display:"flex", "justifyContent":"center", "marginTop":"1%", "width":"70%","margin":"auto", "margin-bottom":"10px"}}>
            <AliceCarousel mouseTracking items={challengeMap} responsive={responsive} autoPlay infinite={3000} animationDuration={2000} disableButtonsControls disableDotsControls />
        </div>
        </>
    )
};

export default WebCarousel;