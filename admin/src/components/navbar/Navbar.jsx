import React from 'react'
import './navbar.css';
import { assets } from '../../assets/assets'
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { NavLink } from 'react-router-dom';
import { Home } from '../../App';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()


  return (
    <>
    <div className='navbar'>
  <img onClick={()=>navigate('/')} className="logo" src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_icon} alt=""/>
        </div>
        <hr />


        </>
        )
}

export default Navbar;
