import { useState ,useContext, createContext, useEffect} from 'react'
import './App.css'
import Home from './pages/Home/Home'
import { ToastContainer, toast } from "react-toastify";
import {BrowserRouter,Routes,Route} from "react-router-dom"

import { food_list } from "./assets/assets"
import Cart from './pages/Cart/Cart'
import Navbar from './components/Navbar/Navbar';
import Review from './pages/Review/Review';
import Sign from './pages/Sign/Sign';
import Login from './pages/Login/Login';

export const context = createContext()

function App() {
    const [quantity,setQ]=useState({});
    const [cart,setCart]=useState([]);

   
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
    <BrowserRouter>
    <context.Provider value={{quantity,setQ,food_list,cart,setCart,addQuantity,removeQuantity}}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Reviews" element={<Review/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<Sign></Sign>} ></Route>
      </Routes>
    </context.Provider>
    </BrowserRouter>
  )
}

export default App
