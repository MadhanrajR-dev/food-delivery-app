import React from 'react'
import './footer.css'
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
  <div className="footer id='footer' bg-[#323232] text-[#d9d9d9] flex flex-col items-center gap-5 px-[8vw] pt-20 mt-24" id='footer'>
  
  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
    {/*  */}
    
    <div className="flex flex-col items-start gap-5">
      <img src={assets.log} alt="" />
      <p>Viste The page Enjoy with Delisious Foods</p>
      <div className="flex items-center">
        <img src={assets.facebook_icon} alt="" className="w-10 mr-4" />
        <img src={assets.twitter_icon} alt="" className="w-10 mr-4" />
        <img src={assets.linkedin_icon} alt="" className="w-10" />
      </div>
    </div>

    
    <div className="flex flex-col items-start gap-5">
      <h2 className="text-white text-lg font-semibold">COMPANY</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About us</li>
        <li className="cursor-pointer">Delivery</li>
        <li className="cursor-pointer">Privacy policy</li>
      </ul>
    </div>


    <div className="flex flex-col items-start gap-5">
      <h2 className="text-white text-lg font-semibold">GET IN TOUCH</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer">+6-3823-44-150</li>
        <li className="cursor-pointer">contact@tomoto</li>
      </ul>
    </div>
  </div>

  
  <hr className="w-full h-[2px] bg-gray-500 my-5 border-none" />

  
  <p className="text-center text-sm text-[#d9d9d9]">
    Copyright 2024 tomato - All Rights Reserved.
  </p>
</div>

  )
}

export default Footer;
