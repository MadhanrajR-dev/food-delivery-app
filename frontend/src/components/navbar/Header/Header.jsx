import React from 'react'
import './header.css'

const Header = () => {
  return (
 <div
  className="w-full mt-[30px] h-[32vw] bg-no-repeat bg-center bg-cover relative flex justify-center items-center px-[40px] "
  style={{ backgroundImage: "url('/header_img.png')" }}
>
  <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[5vw] sm:max-w-[45%]  animation-shake10s">
    <h2 className="font-medium text-white text-[max(4.5vw,22px)]">
      Order your favorite food here
    </h2>
    <p className="text-white text-[2vw] hidden sm:block">
      Choose from a diverse menu featuring a delectable array of dishes
      crafted with the finest ingredients
    </p>
    <button className="text-[#747474] font-medium bg-white rounded-full px-[2.3vw] py-[1vw] text-[max(1vw,13px)] sm:px-[8vw] sm:py-[1vw]">
      View Menu
    </button>
  </div>
</div>

  );
};

export default Header;

