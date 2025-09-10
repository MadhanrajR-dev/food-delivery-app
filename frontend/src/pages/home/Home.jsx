import React, { useContext, useEffect, useState } from 'react'
import './home.css';
import Header from '../../components/navbar/Header/Header';
import Exploremenu from '../../components/navbar/exploremenu/Exploremenu';
import Fooddisplay from '../../components/navbar/fooddisplay/Fooddisplay';
import Appdownload from '../../components/appdownload/Appdownload';
import { StoreContext } from '../../context/StoreContext';
import Navbar from '../../components/navbar/Navbar';
import Loginpopup from '../../components/Loginpopup/Loginpopup';

const Home = ({category,setCategory}) => {
/*   const [category,setCategory]=useState("All"); */
  const {food_list} = useContext(StoreContext);

  const [showSkeleton,setShowSkeleton] = useState(true);
  useEffect(()=>{
    const loadedBefore = localStorage.getItem("foodloaded");
    if(loadedBefore){
      setShowSkeleton(false);
    }else if(food_list && food_list.length > 0){
      setShowSkeleton(false);
      localStorage.setItem("foodloaded","true")
    }

  },[food_list])
  return (
    <div>
{/*               {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
          <Navbar setShowLogin={setShowLogin} category={category} setCategory={setCategory} /> */}
     <Header />
      <Exploremenu  category={category} setCategory={setCategory}/>
      <Fooddisplay  showSkeleton={showSkeleton} category={category} setCategory={setCategory} />
      <Appdownload />
    </div>
  )
}

export default Home
