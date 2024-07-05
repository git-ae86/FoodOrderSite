import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase.js";
import "./Sign.css";

export default function Sign() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      alert("Email Verification link has been sent on your provided email");
      navigate("/Login");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <form>
        <h3>SignUp Here</h3>

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
          <button
            to="/"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Sign Up
          </button>
          <Link to="/Login">Login</Link>
        </div>
      </form>
    </>
  );
}
