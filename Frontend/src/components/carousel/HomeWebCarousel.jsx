import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
};

const items = [
    <img src="/miraclemorning.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/health.jpg" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/study.jpg" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
];


const WebCarousel = () => {
    return (
        <>
        <div className="container" style={{display:"flex", "justifyContent":"center", "marginTop":"1%", "width":"70%","margin":"auto"}}>
            <AliceCarousel mouseTracking items={items} responsive={responsive} />
        </div>
        </>
    )
};

export default WebCarousel;