import { useState } from "react";
import { createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth"
import {useNavigate} from "react-router-dom"
import { auth } from "../firebase";

export default function Sign() {

    const [name, setname] = useState("");
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
            navigate("/login");
        } catch (err) {
            alert(err.message);
        }

    }

    return (
        <>
            <h1 style={{textAlign:"center"}}>Registration</h1>
            <form action="" style={{marginTop:"10vh",textAlign:"center"}}>

                <label htmlFor="name">Name: </label>
                <input id="name" type="text" value={name} onChange={(e) => setname(e.target.value)} />
                <br />
                <br />
                <label htmlFor="email">Email: </label>
                <input id="email" type="email" value={email} onChange={(e) => setemail(e.target.value)} />
                <br />
                <br />
                <label htmlFor="">Password: </label>
                <input id="password" type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <br />
                <br />
                <input style={{marginRight:"4vw"}} onClick={(e) => { handleSubmit(e); }} type="submit" />
                <button onClick={(e) => {e.preventDefault();  navigate("/login");}}  >signUp</button>


            </form>
        </>
    )
}