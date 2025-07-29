import React from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext} from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const success = searchParams.get("success");
    const paymentId = searchParams.get("paymentId")
    const orderId = localStorage.getItem("razor_order_id")
    const {url} = useContext(StoreContext)
    const verifyPayment = async () =>{
        try{
          const response = await axios.post(url+"/api/order/verify",{success,paymentId,orderId})
        if(response.data.success){
            setTimeout(()=>{
                   navigate("/myorders")
            },3000)
            
        }else{
            navigate('/')
        }
        }catch(error){
            console.log(error)
            navigate('/')
        }
       
    }
    useEffect(()=>{
        verifyPayment();
    },[])

  return (
 <div className="verify min-h-[60vh] grid place-items-center overflow-auto">
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 border-4 border-gray-400 border-t-green-500 rounded-full animate-spin shadow-md" />
    <p className="mt-4 text-green-600 font-semibold text-center">Verifying payment...</p>
  </div>
</div>


  )
}

export default Verify
