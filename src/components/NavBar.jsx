import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems =['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const NavBar = () => {
    const [isAudioPlaying, setisAudioPlaying] = useState(false);
    const [isIndicatorActive, setisIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setisNavVisible] = useState(true);

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

    const toggleAudio = () => {
        setisAudioPlaying((prevState) => !prevState);
        setisIndicatorActive((prevState) => !prevState);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if(currentScrollY === 0){
            setisNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY){
            setisNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY){
            setisNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavVisible]);

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    <img src="/img/logo.png" alt="logo" className="w-10"/>
                </div>
                <div className="flex h-full items-center">
                    <div className="hidden md:block">
                        {navItems.map((item, index) => (
                            <a key={index} className="nav-hover-btn" href={`#${item.toLowerCase()}`}>
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudio}>
                        <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                        {[1,2,3,4].map((bar) => (
                            <div key={bar}
                            className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                            style={{ animationDelay: `${bar * 0.1}s` }}
                            />
                        ))}
                     </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default NavBar
