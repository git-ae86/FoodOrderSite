import logo from "../../../public/cropped_image.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <nav className="text-[#c3c3c3] max-[308px]:text-sm max-[340px]:text-lg text-xl flex justify-between px-8 py-2 items-center w-full bg-[#242424] fixed top-0 z-10">
      <div className="logo max-[930px]:hidden h-[7vh] w-[3.8vw] object-none">
        <img
          src={logo}
          className="h-[100%] w-[100%] object-contain rounded-full"
          alt="logo"
        />
      </div>
      <ul className="flex justify-between max-[930px]:w-[70%] w-[30%]">
        <Link
          to="/"
          style={{ color: location.pathname == "/" ? "#f05a35" : "" }}
          className="hover:cursor-pointer hover:text-[#f05a35]"
        >
          Home
        </Link>
        <Link
          to="/Reviews"
          style={{ color: location.pathname == "/Reviews" ? "#f05a35" : "" }}
          className="hover:cursor-pointer hover:text-[#f05a35]"
        >
          Reviews
        </Link>
        <Link
          to="/Cart"
          style={{ color: location.pathname == "/Cart" ? "#f05a35" : "" }}
          className="hover:cursor-pointer hover:text-[#f05a35]"
        >
          Cart
        </Link>
      </ul>
      <div>
        <Link
          to="/Login"
          onClick={() => logout()}
          className="hover:text-[#f05a35]"
        >
          Log Out
        </Link>
      </div>
    </nav>
  );
}
