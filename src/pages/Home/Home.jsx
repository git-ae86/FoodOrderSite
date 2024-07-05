import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Home(){
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user == null || !user.emailVerified) {
        navigate("/Login");
      } 
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);
    
    return (
        <>
          <Navbar/>  
          <Hero/>
          <Filter/>
          <Footer/>
        </>
    )
}