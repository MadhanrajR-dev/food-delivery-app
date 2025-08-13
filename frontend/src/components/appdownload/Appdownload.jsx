import React, { useEffect, useState } from 'react'
import './appdownload.css'
import {assets} from '../../assets/assets'

const Appdownload = () => {
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
   setInterval(()=>setLoading(false),4000)
  },[])
  return (
    <>
  {loading ? (
  <div className="mx-auto bg-white mt-[100px] text-center font-medium text-[max(3vw,20px)] animate-pulse">
    {/* skeleton want actual structure of our real content */}
    <div className="h-6 w-1/2 mx-auto bg-gray-300 rounded"></div>

    
    <div className="flex justify-center gap-[max(2vw,10px)] mt-10">
      <div className="w-[max(30vw,120px)] max-w-[180px] h-16 bg-gray-300 rounded"></div>
      <div className="w-[max(30vw,120px)] max-w-[180px] h-16 bg-gray-300 rounded"></div>
    </div>
  </div>
) : (
  <div id='app-download' className="mx-auto mt-[100px] text-center font-medium text-[max(3vw,20px)]">
    <p>For Better look For</p>

    <div className="flex justify-center gap-[max(2vw,10px)] mt-10">
      <img
        src={assets.play_store}
        alt=""
        className="w-[max(30vw,120px)] max-w-[180px] transition-transform duration-500 cursor-pointer hover:scale-105"
      />
      <img
        src={assets.app_store}
        alt=""
        className="w-[max(30vw,120px)] max-w-[180px] transition-transform duration-500 cursor-pointer hover:scale-105"
      />
    </div>
  </div>
)}

    
    </>
  
  )
}

export default Appdownload
