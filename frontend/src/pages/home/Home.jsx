import React, { useState } from 'react'
import './home.css';
import Header from '../../components/navbar/Header/Header';
import Exploremenu from '../../components/navbar/exploremenu/Exploremenu';
import Fooddisplay from '../../components/navbar/fooddisplay/Fooddisplay';
import Appdownload from '../../components/appdownload/Appdownload';

const Home = () => {
  const [category,setCategory]=useState("All")
  return (
    <div>
        <Header/>
        <Exploremenu category={category} setCategory={setCategory}/>
      <Fooddisplay category={category}/>
      <Appdownload/>
    </div>
  )
}

export default Home
