import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";

export default function Home(){
    return (
        <>
          <Navbar/>  
          <Hero/>
          <Filter/>
          <Footer/>
        </>
    )
}