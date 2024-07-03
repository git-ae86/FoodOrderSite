import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { food_list } from "../../assets/assets";
import { context } from "../../App";
import "./Cart.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
let genAI;
let text;
export default function Cart() {
  const { cart, setCart } = useContext(context);
  const { ca, setca } = useState([...food_list]);
  const [flag,setflag]=useState(true);
 

  useEffect(() => {
    let API_KEY = "AIzaSyAWJXYhKtvOKmrcHXSIyL3z33-5s4wTdKw";
    genAI = new GoogleGenerativeAI(API_KEY);
  }, []);
  async function run(prompt) {
    prompt=prompt.map((ele)=>{
      return ele.name;
    })
    const newW=prompt.toString();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const result = await model.generateContent("Give nutrional value information for these Foods :"+newW);
    const response = await result.response;
    text = response.text();
    console.log(text);
    
  }

  function remove(id) {
    setCart(
      cart.filter((ele) => {
        if (ele._id != id) return ele;
      })
    );
  }

  return (
    <div>
      <div className="modal h-[100vh] bg-[rgb(22,44,70,0.9)] fixed w-full z-20 flex justify-center items-center" style={{display:flag?"none":"fixed"}}>
        <div className="h-[80%] w-[90%] border-2 border-[#5F634F] p-9 relative"><pre>{text}</pre><p className="text-red-600 hover:cursor-pointer absolute top-0 right-3 text-xl" onClick={()=>setflag(true)}>x</p></div>
      </div>
      <Navbar />
      <h2 className="text-center mt-[8vh] text-4xl z-10 text-white">
        Cart ({cart.length})
      </h2>
      <div className="cartbox mt-2 w-[67%] mx-auto bg-slate-800 h-[50vh] rounded-lg overflow-y-scroll relative">
        {cart.map((ele, idx) => {
          return (
            <div
              className="flex justify-between w-full items-center px-6 py-3 "
              key={idx}
            >
              <p className="h-[9vh] rounded-full mr-2">
                <img className="h-full rounded-full" src={ele.image}></img>
              </p>
              <div className="flex w-full justify-between items-center">
                <p className="w-[33.33%]">Item: {ele.name}</p>
                <p className="w-[33.33%]">Price: ${ele.price}</p>
                <p className="w-[33.33%]">Quantity: 3</p>
                {/* <p className="">Total: 3</p> */}
                <p
                  className="text-red-600 hover:cursor-pointer"
                  onClick={() => {
                    remove(ele._id);
                  }}
                >
                  x
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-[#1e293b] w-[67%] p-1 mx-auto mt-2">
        <p className="text-center text-2xl">Total ${234}</p>
      </div>
      <div className=" w-[67%] mx-auto flex justify-between mt-4">
        <button className="bg-[#04aa6d] hover:bg-[#25795a] p-2 rounded-lg" onClick={()=>{setflag(false); console.log(flag)}}>
          Get Nutritional Value
        </button>
        <button className="bg-[#04aa6d] hover:bg-[#25795a] p-2 rounded-lg">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
