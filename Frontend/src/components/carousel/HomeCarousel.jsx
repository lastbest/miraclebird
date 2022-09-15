import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './HomeCarousel.module.css';
import React from 'react';
import { MobileView } from 'react-device-detect';


const AutoplaySlider = withAutoplay(AwesomeSlider);

const HomeCarousel = () => {

    return (  
        <>
        <MobileView>
            <AutoplaySlider play={true} cancelOnInteraction={false} interval={6000} className='container mt-4' style={{width:"100%"}}>
                <div data-src="/miraclemorning.png" style={{width:"100%"}} />
                <div data-src="/health.jpg" style={{width:"100%"}} />
                <div data-src="/study.jpg" style={{width:"100%"}} />
            </AutoplaySlider>
        </MobileView>
        </>  
    )
};

export default HomeCarousel;