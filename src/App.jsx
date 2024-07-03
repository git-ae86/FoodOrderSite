import { useState ,useContext, createContext} from 'react'
import './App.css'
import Home from './pages/Home/Home'

import { food_list } from "./assets/assets"
import Cart from './pages/Cart/Cart'

export const context = createContext()

function App() {
    const [quantity,setQ]=useState({});
    const [cart,setCart]=useState([...food_list]);

    function addQuantity(id){
      if(!quantity[id])
        setQ((prev)=>({...prev,[id]:1}))
      else  
        setQ((prev)=>({...prev,[id]:prev[id]+1}))
    }
    function removeQuantity(id){
        setQ((prev)=>({...prev,[id]:prev[id]-1}))
    }
    

  return (
    <context.Provider value={{quantity,setQ,cart,setCart,food_list,cart,setCart,addQuantity,removeQuantity}}>
      {/* <Home/> */}
      <Cart/>
      {/* <Sign></Sign> */}
    </context.Provider>
  )
}

export default App
