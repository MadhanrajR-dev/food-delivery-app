import { useEffect, useState } from "react";
import "./header.css";
import { assets } from "../../../assets/assets";

const Header = () => {
  const images = [
    assets.header_img1,
    assets.header_img3,
    assets.header_img4,
    assets.header_img5,
  ];
  const [loading, setloading] = useState(true);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setloading(false), 4000);
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);
  return (
    <>
      {loading ? (
        <div className="w-full mt-[30px] h-[32vw] bg-gray-100 bg-no-repeat bg-center bg-cover relative flex justify-center items-center px-[40px] animate-pulse">
          <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[5vw] sm:max-w-[45%]">
            {/* Heading Skeleton */}
            <div className="bg-gray-300 h-[max(4.5vw,22px)] w-3/4 rounded"></div>

            {/* Paragraph Skeleton */}
            <div className="bg-gray-300 h-[2vw] w-full hidden sm:block rounded"></div>

            {/* Button Skeleton */}
            <div className="bg-gray-300 h-[max(3vw,40px)] w-[150px] rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="w-full mt-[30px] h-[32vw] bg-no-repeat bg-center bg-cover relative flex justify-center items-center px-[40px] overflow-hidden ">
          {/* previous image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${images[prevIndex]})` }}
          ></div>
          {/* newImage */}
          <div
            key={index} //
            className="absolute inset-0 bg-no-repeat bg-center bg-cover fade-image"
            style={{ backgroundImage: `url(${images[index]})` }}
          ></div>
          <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[5vw] sm:max-w-[45%] animation-shake10s">
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
      )}
    </>
  );
};

export default Header;
