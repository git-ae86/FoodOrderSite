import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase.js";
import "./Login.css";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Success");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Email</label>
        <input
          type={email}
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
          className="p-2"
          id="username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          className="p-2 mb-8"
          placeholder="Password"
          id="password"
        />

        <div className="text-center flex justify-between">
          <button to="/" onClick={(e)=>{handleLogin(e)}}>Log In</button>
          <Link to="/SignUp" >Sign Up</Link>
        </div>
      </form>
    </>
  );
}
