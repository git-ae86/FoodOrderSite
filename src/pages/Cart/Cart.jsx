import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { food_list } from "../../assets/assets";
import { context } from "../../App";
import "./Cart.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer/Footer";

let genAI;
export default function Cart() {
  const { cart, setCart } = useContext(context);
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);
  const [flag2, setflag2] = useState(true);
  const [text, setText] = useState("Please Wait");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const notify2 = () => {
    toast.error("Item Deleted", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  function onOpenHandler() {
    alert("Payments Modal is Opened");
  }

  function onCloseHandler() {
    alert("Payments Modal is Closed");
  }

  function onPaymentSuccessHandler(response) {
    alert("Payment Success");
    console.log("Payment Success Response", response);
  }

  function onPaymentFailureHandler(response) {
    alert("Payment Failure");
    console.log("Payment Failure Response", response);
  }
  /* End client-defined Callback Handler Functions */

  /* Configuring Handlers */
  Instamojo.configure({
    handlers: {
      onOpen: onOpenHandler,
      onClose: onCloseHandler,
      onSuccess: onPaymentSuccessHandler,
      onFailure: onPaymentFailureHandler,
    },
  });

  useEffect(() => {
    let API_KEY = "AIzaSyDO1vxwfZ0JZE3S_d0BYEm3mUT-fe_vJ40";
    genAI = new GoogleGenerativeAI(API_KEY);
  }, []);

  async function run(prompt) {
    prompt = prompt.map((ele) => {
      return ele.name;
    });
    const newW = prompt.toString();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(
        "Give nutrional value information for these Foods :" + newW
      );
      const response = await result.response;
      setText(response.text());
    } catch (err) {
      alert(err);
    }
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
      <div
        className="modal h-[100vh] bg-[rgb(22,44,70,0.9)] fixed top-0 w-full z-20 flex justify-center items-center"
        style={{ display: flag ? "none" : "block" }}
      >
        {/* Nutritional Value Display */}

        <div
          className="h-[80%] w-[90%] mt-[10vh] bg-slate-950 mx-auto border-2 border-[#5F634F] p-9 relative overflow-y-scroll"
          style={{ display: flag1 ? "none" : "block" }}
        >
          <pre>{text}</pre>
          <p
            className="hover:text-red-500 text-red-700 hover:cursor-pointer absolute top-0 right-3 text-2xl"
            onClick={() => {
              setflag(true), setflag1(true);
            }}
          >
            x
          </p>
        </div>

        {/* Checkout Display */}

        <div
          className=" w-[90%] mt-[10vh] bg-slate-950 mx-auto border-2 border-[#5F634F] p-2 min-[330px]:p-5 min-[780px]:p-9 relative "
          style={{ display: flag2 ? "none" : "block" }}
        >
          <div>
            <h2 className="text-center text-2xl">Checkout Page</h2>
            <main>
              <h3 className="text-xl">Enter Your Details</h3>
              <div className="min-[610px]:flex my-2 gap-2 max-[372px]:text-xs max-[419px]:text-sm">
                <input
                  type="text"
                  className="p-1 max-[610px]:mb-2"
                  placeholder="Name"
                />
                <input className="p-1" type="text" placeholder="Address" />
              </div>
              <input
                type="text"
                className="p-1 max-[372px]:text-xs max-[419px]:text-sm"
                placeholder="Enter Building No. and Street Name (Optional)"
              />
              <div className="min-[426px]:flex my-2 gap-2 max-[372px]:text-xs max-[419px]:text-sm">
                <input
                  type="number"
                  className="p-1 max-[426px]:mb-2"
                  placeholder="Enter Pincode"
                />
                <input
                  className="p-1"
                  type="number"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <input
                type="text"
                className="p-1 max-[372px]:text-xs max-[419px]:text-sm"
                placeholder="Enter Landmark (Optional)"
              />
              <div className="flex mt-[6vh] justify-between px-9">
                <p>
                  Net Amount: $
                  {cart.reduce((acc, ele) => {
                    return acc + ele.price * ele.quantity;
                  }, 0)}
                </p>
                <button
                  className="bg-[#04aa6d] hover:bg-[#25795a] max-[300px]:text-xs max-[320px]:text-sm max-[490px]:p-1 p-2 rounded-lg"
                  onClick={() => {
                    Instamojo.open("https://test.instamojo.com/@satan999/");
                  }}
                >
                  Pay Now
                </button>
              </div>
            </main>
          </div>
          <p
            className="hover:text-red-500 text-red-700 hover:cursor-pointer absolute top-0 right-3 text-2xl"
            onClick={() => {
              setflag(true), setflag2(true);
            }}
          >
            x
          </p>
        </div>
      </div>
      <Navbar />
      <h2 className="text-center mt-[18vh] text-4xl z-10 text-white">
        Cart ({cart.length})
      </h2>
      <div className="cartbox mt-2  max-[463px]:w-[98%] max-[541px]:w-[89%] max-[608px]:w-[80%] max-[665px]:w-[72%] w-[67%] mx-auto bg-slate-800 h-[50vh] rounded-lg overflow-y-scroll relative">
        {cart.map((ele, idx) => {
          return (
            <div
              className="flex max-[441px]:text-xs max-[832px]:text-sm justify-between w-full items-center max-[368px]:px-1 px-6 py-3 "
              key={idx}
            >
              <p className="h-[9vh] rounded-full mr-2">
                <img className="h-full rounded-full" src={ele.image}></img>
              </p>
              <div className="flex w-full justify-between items-center">
                <p className="w-[34.33%]">Item: {ele.name}</p>
                <p className="w-[32.33%]">Price: ${ele.price}</p>
                <p className="w-[32.33%]">Quantity: {ele.quantity}</p>
                {/* <p className="">Total: 3</p> */}
                <p
                  className="hover:cursor-pointer"
                  onClick={() => {
                    remove(ele._id);
                    notify2();
                  }}
                >
                  <i className="fa-solid fa-trash text-red-600 "></i>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-[#1e293b] max-[463px]:w-[98%] max-[541px]:w-[89%] max-[608px]:w-[80%] max-[665px]:w-[72%] w-[67%] p-1 mx-auto mt-2">
        <p className="text-center text-2xl">
          Total $
          {cart.reduce((acc, ele) => {
            return acc + ele.price * ele.quantity;
          }, 0)}
        </p>
      </div>
      <div className="max-[463px]:w-[98%] max-[541px]:w-[89%] max-[608px]:w-[80%] max-[665px]:w-[72%] w-[67%] mx-auto flex justify-between mt-4">
        <button
          className="bg-[#04aa6d] hover:bg-[#25795a] max-[300px]:text-xs max-[320px]:text-sm max-[490px]:p-1 p-2 rounded-lg"
          onClick={() => {
            setflag(false);
            setflag1(false);
            run(cart);
          }}
        >
          Get Nutritional Value
        </button>
        <button
          className="bg-[#04aa6d] hover:bg-[#25795a] max-[300px]:text-xs max-[320px]:text-sm max-[490px]:p-1 p-2 rounded-lg"
          onClick={() => {
            setflag(false);
            setflag2(false);
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
