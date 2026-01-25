import React, { useContext, useEffect, useState } from 'react'
import './exploremenu.css'
/* import { menu_list } from '../../../assets/assets'  */
import { StoreContext } from '../../../context/StoreContext';


const Exploremenu = ({ category, setCategory }) => {
  const [loading, setLoading] = useState(true);
   const { menu_list , url} = useContext(StoreContext) 

  useEffect(() => {
      setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Explore our menu
          </h1>

          <p className="text-center text-gray-600 text-base sm:text-lg mb-8">
            Choose from a diverse menu featuring an array of dishes, our mission
            is to...
          </p>
 
     
          <div id='exeplore-menu' className="flex flex-wrap  overflow-hidden justify-center gap-6 sm:gap-10 mb-6">
            <div className='flex  '>
            {menu_list.map((item, _)=>(
              <div key={item._id}
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
