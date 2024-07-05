import { useContext, useState , useEffect} from "react";
import { menu_list, assets } from "../../assets/assets";
import { food_list } from "../../assets/assets";
import "./Filter.css";
import { context } from "../../App";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Filter() {
  const [category, setCategory] = useState("All");
  const {cart,setCart, quantity, setQ, addQuantity, removeQuantity } = useContext(context);
  
  useEffect(()=>{
    if(cart.length>0)
    localStorage.setItem("cart",JSON.stringify(cart));
  },[cart])

    const notify1 = () => {
      toast.success("Item Added", {
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
    
  return (
    <div className="filter my-[6vh] w-[80%] mx-auto">
      <h2 className="text-4xl mb-[2vh]">Explore our menu</h2>
      <p>Choose from a diverse menu featuring a array of dishes.</p>
      <div className="slider">
        {menu_list.map((ele, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setCategory((prev) =>
                  prev == ele.menu_name ? "All" : ele.menu_name
                );
              }}
            >
              <img
                src={ele.menu_image}
                className={category == ele.menu_name ? "active" : ""}
              />
              <p>{ele.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="foods flex max-[680px]:justify-center justify-between gap-1 min-[680px]:gap-2 flex-wrap mt-[5vh]">
        {food_list.map((ele, idx) => {
          if (category == "All" || category == ele.category) {
            return (
              <div key={idx} className="mb-[2vh] max-[679px]:w-[80%] min-[680px]:max-[815px]:w-[40%] min-[816px]:max-[1368px]:w-[30%] ">
                <div className="relative">
                  <img
                    style={{ borderRadius: "15px 15px 0 0" }}
                    src={ele.image}
                    alt=""
                    className="max-[680px]:w-[100%]"
                  />
                  {quantity[ele._id] < 1 || !quantity[ele._id] ? (
                    <img
                      className="absolute bottom-[15px] right-[15px] hover:cursor-pointer w-[35px]"
                      src={assets.add_icon_white}
                      onClick={() => {
                        addQuantity(ele._id);
                      }}
                    ></img>
                  ) : (
                    <div className="absolute bottom-[15px] right-[15px] flex items-center p-[6px] gap-[10px] rounded-[50px] bg-slate-600 hover:cursor-pointer">
                      <img
                        src={assets.add_icon_green}
                        onClick={() => {
                          addQuantity(ele._id);
                        }}
                        alt=""
                      />
                      <p>{quantity[ele._id]}</p>{" "}
                      <img
                        src={assets.remove_icon_red}
                        onClick={() => {
                          removeQuantity(ele._id);
                        }}
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <h2>{ele.name}</h2>
                  <img src={assets.rating_starts} alt="" />
                </div>

                <p>${ele.price}</p>
                <div className="flex justify-between w-[100%]">
                  <button onClick={()=>{if(quantity[ele._id]>0){ setCart((prev)=>([...prev,{quantity:quantity[ele._id],name:ele.name,price:ele.price,image:ele.image,_id:ele._id}]));notify1()}}} className="bg-[#ff7c18] hover:bg-[#fe5000] p-1 px-2 rounded-md">
                    Add To Cart
                  </button>
                  <Link to="./Cart" className="bg-[#ff7c18] hover:bg-[#fe5000] p-[1] px-2 rounded-md">
                    Go To Cart
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
