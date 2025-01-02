import React from 'react'

const Button = ({id, title, leftIcon, rightIcon, containerClass }) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full  px-7 py-3 text-black ${containerClass}`}>
        {leftIcon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
            {title}
        </span>
        {rightIcon}
    </button>
  )
}

export default Button
