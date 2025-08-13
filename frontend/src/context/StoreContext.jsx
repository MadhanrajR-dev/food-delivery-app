import React, { createContext,useEffect,useState } from "react";
import axios from 'axios';



export const StoreContext = createContext(null);

  const StoreContextProvider=(props)=>{
  const [cartItem,setCartItem]=useState({});
  const url = import.meta.env.VITE_API_URL;

  const [token,setToken]=useState("");
  const [food_list,setFoodList]=useState([])
  const [searchQuery,setSearchQuery] = useState(()=>{
  const saved =  localStorage.getItem("lastSearch")
  return saved ? saved :""
});
  const [recentSearch,setRecentSearch] = useState(JSON.parse(localStorage.getItem("recentSearch")) || [])
  
  const addCart=async (itemId)=>{
    if(!cartItem?.[itemId]){
        setCartItem((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
}
  const removeCart=async (itemId)=>{
  setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  if(token){
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };
  

      const fetchFoodList=async()=>{
      const response = await axios.get(url+"/api/food/list");
      setFoodList(response.data.data)
      }

      const loadCartData=async (token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData);
      }
  
      useEffect(()=>{
        async function loadData(){
          await fetchFoodList();
         if(localStorage.getItem("token"))
          {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
          }
        
        }
        loadData();
      },[])

      useEffect(()=>{
      localStorage.setItem("lastSearch",searchQuery)
      },[searchQuery])

      const addRecentSearches = (term)=>{
     if(!term && !term.trim()) return;
     if(!recentSearch.includes(term)){
      const updated = [term,...recentSearch].splice(0,5);
      setRecentSearch(updated);
     }

      }
      useEffect(() => {
  localStorage.setItem("recentSearch", JSON.stringify(recentSearch));
}, [recentSearch]);

      console.log(addRecentSearches);
      

const contextValue={
         food_list,
         setFoodList,
         setSearchQuery,
         searchQuery,
         recentSearch,
         cartItem,
         addRecentSearches,
         setCartItem,
         setRecentSearch,
         addCart,
         removeCart,
         getTotalCartAmount,
         url,
         token,
         setToken
         }
    return(
        <>
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        </>
    )
}
export default StoreContextProvider;