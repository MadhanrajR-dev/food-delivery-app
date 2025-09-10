import React, { useContext, useEffect, useState } from 'react'
import './exploremenu.css'
/* import { menu_list } from '../../../assets/assets'  */
import { StoreContext } from '../../../context/StoreContext';


const Exploremenu = ({ category, setCategory }) => {
  const [loading, setLoading] = useState(true);
   const { menu_list,url} = useContext(StoreContext) 

  useEffect(() => {
      setTimeout(() => setLoading(false), 2000);

  }, []);


  return (
    /* <div className="w-full px-4 sm:px-8 py-10 bg-white" id="explore-menu">
       {loading ? (
        <div className="animate-pulse">
        
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>

      
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-8"></div>

          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="text-center w-[120px] sm:w-[150px] flex flex-col items-center gap-2"
              >
              
                <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
              
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-gray-200 mt-6"></div>
        </div>
      ) : (  */
        <>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Explore our menu
          </h1>

          <p className="text-center text-gray-600 text-base sm:text-lg mb-8">
            Choose from a diverse menu featuring an array of dishes, our mission
            is to...
          </p>
 
     
          <div id='exeplore-menu' className="flex flex-wrap  overflow-hidden justify-center gap-6 sm:gap-10 mb-6">
            <div className='flex    hover:[animation-play-state:paused]'>
            {menu_list.map((item, index) =>  (
            
              <div key={index}
                onClick={() =>
                  setCategory((prev)=> prev === item.name?"All":item.name)
                }
                className="cursor-pointer text-center w-[120px] sm:w-[150px] flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={url+'/image/'+item.image}
                  alt={item.name}
                  className={`w-[100px] h-[100px] object-cover rounded-full border-4 ${
                    category === item.name
                      ?"border-[tomato]"
                      :"border-gray-500"
                  }`}
                />
                <p className="text-sm sm:text-base">{item.name}</p>
              </div>
            ))}

             {menu_list.map((item, index) =>  (
            
              <div key={index}
                onClick={() =>
                  setCategory((prev)=> prev === item.name?"All":item.name)
                }
                className="cursor-pointer text-center w-[120px] sm:w-[150px] flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={url+'/image/'+item.image}
                  alt={item.name}
                  className={`w-[100px] h-[100px] object-cover rounded-full border-4 ${
                    category === item.name
                      ?"border-[tomato]"
                      :"border-gray-500"
                  }`}
                />
                <p className="text-sm sm:text-base">{item.name}</p>
              </div>
            ))}
            </div>
          </div>

          <hr className="border-t border-gray-200 mt-10" />
        </>
      
  
  );
};
export default Exploremenu;
