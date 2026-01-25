import React, { useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets.js';
import { NavLink } from 'react-router-dom';
import {Menu ,X} from 'lucide-react';
const Sidebar = () => {
  const[isOpen ,setIsOpen] = useState(false);

  const handleOpen = ()=>{
   setIsOpen(!isOpen);
  }
  const handleClose = ()=>{
    setIsOpen(false);
  }

  return (

    <div className='relative ml-4 max-h-screen  z-10  '>
      <button onClick={handleOpen} className='p-2 rounded-md shadow-md bg-white/40 '>
       {isOpen  ? <X className='h-6 w-6'/>:<Menu className='h-6 w-6'/>}
      </button>
      {isOpen  ? (
         <div className='absolute w-40 mt-2  bg-white border rounded-md shadow-lg flex flex-col'>
        <NavLink to='/add' onClick={handleClose} className=' px-4 py-1  hover:bg-green-300 w-40'>
          Add Item
          </NavLink><br/>
        <NavLink to='/list' onClick={handleClose} className='px-4 py-1 hover:bg-green-300 w-full'>

        List Item
        </NavLink><br/>
        <NavLink to='/orders' onClick={handleClose} className='px-4 py-1 hover:bg-green-300'>

          Orders
        </NavLink><br/>
        <NavLink to='/menu' onClick={handleClose} className='px-4 py-1 hover:bg-green-300'>
        Menu
        </NavLink><br/>
        <NavLink to='/menulist' onClick={handleClose} className='block w-full px-4 py-1 hover:bg-green-300'>
        List Menu
        </NavLink>
         </div>


      ):(
        <div className='flex justify-center items-center rounded-md shadow-md'></div>
      )}
    </div>
  )
}

export default Sidebar;
