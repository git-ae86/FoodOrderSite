import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { revs } from "../../assets/assets";
import r from "../../assets/r.avif";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Review() {
  const [text, setText] = useState("");
  const [data, setData] = useState([...revs]);

  const notify3 = () => {
    toast.info("Review Added", {
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

  function handleSubmit() {
    if (text.length > 0) {
      let arr = [...data];
      arr.unshift({ image: r, name: "You", des: text });
      setData(arr);
      setText("");
    }
  }

  console.log(auth);

  return (
    <div>
      <Navbar />

      {/* Submit Review */}

      <div className="mt-[11vh] max-[463px]:w-[80%] max-[541px]:w-[70%] max-[608px]:w-[60%] max-[810px]:w-[50%] w-[40%] mx-auto h-[22vh] rounded-md">
        <textarea
          className="bg-[#38444d] w-full h-full p-3 rounded-md"
          placeholder="Write Review"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          id=""
        >
          {" "}
        </textarea>
      </div>
      <div className="text-center mt-3">
        <button
          className="bg-[#04aa6d] hover:bg-[#25795a] p-2 rounded-lg"
          onClick={() => {
            handleSubmit();
            notify3();
          }}
        >
          Submit
        </button>
      </div>

      {/* Review Display */}

      <h2 className="mt-[3vh] text-center text-3xl">Reviews</h2>
      <div className="cartbox mt-2 max-[463px]:w-[98%] max-[541px]:w-[89%] max-[608px]:w-[80%] max-[665px]:w-[72%] w-[67%] mx-auto bg-slate-800 h-[50vh] mb-[5vh] rounded-lg overflow-y-scroll relative">
        {data.map((ele, idx) => {
          return (
            <div className=" w-full  px-6 py-3 " key={idx}>
              <div className="flex items-center gap-1">
                <p className="h-[7vh] rounded-full mr-2">
                  <img className="h-full rounded-full" src={ele.image}></img>
                </p>
                <p className="w-[33.33%]"> {ele.name}</p>
              </div>
              <p className="">{ele.des}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
