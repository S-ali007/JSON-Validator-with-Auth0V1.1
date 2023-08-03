import React from 'react'

function Button({text,handleclick,extraclasses}) {
  return (
    <>
       <div className=" border-[2px] font-bold text-sky-500 hover:text-white text-[16px]  rounded-[10px] text-center  py-[5px]  hover:bg-sky-500   ">
          <button className={extraclasses}   onClick={handleclick}  >{text}  </button>
        </div>
    </>
  )
}

export default Button
