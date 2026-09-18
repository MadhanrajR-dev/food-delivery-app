import { createContext,useEffect,useState } from "react";
import axios from 'axios';


export  function useDebounce(value,delay){
const [debounceValue,setDebounceValue] = useState(value);
useEffect(()=>{
const timeOut = setTimeout(()=>{
setDebounceValue(value)
},delay)
return ()=>clearTimeout(timeOut);
},[value])
return debounceValue;
}

export const StoreContext = createContext(null);
  const StoreContextProvider=(props)=>{
  const [cartItem,setCartItem]=useState({});
  const url = 'http://localhost:5000'  /* import.meta.env.VITE_API_URL */ ;
  const [token,setToken]=useState("");
  const [food_list,setFoodList]=useState([])
  const [menu_list,setMenuList] = useState([]);
  const [ searchQuery,setSearchQuery ] = useState(()=>{
  const saved =  localStorage.getItem("lastSearch")
  return saved ? saved :""
});
  const [recentSearch,setRecentSearch] = useState(JSON.parse(localStorage.getItem("recentSearch")) || [])
  
  const addCart= async (itemId)=>{
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
      const fetchMenuList = async ()=>{
        const response = await axios.get(url+'/api/menu/all')
        setMenuList(response.data.data);
      }

      const loadCartData=async (token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData);
      }
  
      useEffect(()=>{
        async function loadData(){ 
          await Promise.all([
          fetchFoodList(),
          fetchMenuList()
        
      ]);
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
         menu_list,
         setMenuList,
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