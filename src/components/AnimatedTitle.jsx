import React, { useRef } from 'react'
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({title, containerClass}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() =>{
            const titleAnimation = gsap.timeline({
                scrollTrigger:{
                    trigger: containerRef.current,
                    start: '100 bottom ',
                    end: 'center bottom',
                    scrub: 0.5,
                    toggleActions: 'play none none reverse'
                }
            });
            titleAnimation.to('.animated-word', {
                opacity: 1,
                transform: 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg) ',
                stagger: 0.2,
                ease: 'power2.inOut',
            })
            return () =>{
                ctx.revert();
            }
        }, containerRef)
    },[])
  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`} >
        {title.split('<br />').map((letter, index) => (
            <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
             {letter.split(' ').map((char, index) => (
                <span key={index} className="animated-word"
                    dangerouslySetInnerHTML={{ __html: char }}/>
             ))}
            </div>
        ))}
</div>
  )
}
export default AnimatedTitle
