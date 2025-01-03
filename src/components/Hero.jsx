import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import Button from './button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

function Hero() {

    const [currentIndex, setcurrentIndex] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [loadedvideos, setloadedvideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);

    const videoSrc = (index) => `videos/hero-${index}.mp4`;

    const handelVideoLoad = () => {
        setloadedvideos((prevLoaded) => prevLoaded + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        sethasClicked(true);
        setcurrentIndex(upcomingVideoIndex);
     }
     useEffect(() => {
            if(loadedvideos === totalVideos - 1){
                setisloading(false);
            }
     },[loadedvideos])

     useGSAP(() => {
        if(hasClicked){
            gsap.set("#next-video",{visibility:'visible'});

            gsap.to("#next-video",{
                transformOrigin:'center center',
                scale:1,
                duration:1,
                width:'100%',
                height:'100%',
                ease:'power1.inOut',
                onStart:()=>{
                    nextVideoRef.current.play();
                },
            })
            gsap.from("#current-video",{
                transformOrigin:'center center',
                scale:0,
                duration:1.5,
                ease:'power1.inOut',
            })
        }
     },{dependencies:[currentIndex],revertOnUpdate:true})

     useGSAP(()=>{
        gsap.set('#video-frame',{
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius:'0 0 40% 10%',
        });

        gsap.from("#video-frame",{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius:'0 0 0 0',
            ease:'power1.inOut',
            scrollTrigger:{
                trigger:'#video-frame',
                start:'center center',
                end:'bottom center',
                scrub:true,
            }
        })
     })

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        {isloading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                <div className='three-body'>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>

                </div>
            </div>
        )}
        <div id="video-frame" className='relative h-dvh w-screen z-10 overflow-hidden rounded-lg bg-blue-75'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100'>
                        <video ref={nextVideoRef} src={videoSrc(upcomingVideoIndex)} loop muted
                            id='current-video' className='size-64 origin-center scale-150 object-cover object-center'
                            onLoadedData={handelVideoLoad}/>
                    </div>
                </div>
                <video
                    ref={nextVideoRef}
                    src={videoSrc(currentIndex)}
                    loop
                    muted
                    id='next-video'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handelVideoLoad}

                />

                <video
                    src={videoSrc(currentIndex===totalVideos-1?1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    className='absolute left-0 top-0 size-full object-cover object-center'
                    onLoadedData={handelVideoLoad}
                />
            </div>
            <h1
            className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'
            >G<b>a</b>ming</h1>
            <div className="absolute top-0 left-0 size-full z-40">
                <div className='mt-24 px-5 sm:px-10'>
                    <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                    <p className='mb-5 max-w-64 font-robort-regular text-blue-100'>Enter the Metagame Layer <br />Unleash the Play Economy</p>
                    <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1"/>
                </div>

            </div>
        </div>
        <h1
            className='special-font hero-heading absolute bottom-5 right-5 text-black'
            >G<b>a</b>ming</h1>

    </div>
  )
}

export default Hero
