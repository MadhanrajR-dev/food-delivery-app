import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"


function MenuItem({name,image}){
    const {url} = useContext(StoreContext);

    return(
        <>
        <img src={url+'/image'+image} alt='menu'/>
        <p>{name}</p>
        </>
    )

}

export default MenuItem;