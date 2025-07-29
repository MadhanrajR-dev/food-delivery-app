import React from 'react'
import './exploremenu.css'
import { menu_list } from '../../../assets/assets'

const Exploremenu = ({category,setCategory}) => {
  return (
       <div className='w-full px-4 sm:px-8 py-10 bg-white' id='exeplore-menu'>
      <h1 className='text-2xl sm:text-3xl font-bold text-center mb-4'>Explore our menu</h1>
      
      <p className='text-center text-gray-600 text-base sm:text-lg mb-8'>
        Choose from a diverse menu featuring an array of dishes, our mission is to...
      </p>

      <div className='flex flex-wrap justify-center gap-6 sm:gap-10 mb-6'>
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className='cursor-pointer text-center w-[120px] sm:w-[150px] flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200'
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[100px] h-[100px] object-cover rounded-full border-2 ${
                category === item.menu_name ? 'border-[tomato]' : 'border-gray-500'
              }`}
            />
            <p className='text-sm sm:text-base'>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr className='border-t border-gray-200 mt-6' />
    </div>
  )
}
export default Exploremenu;
