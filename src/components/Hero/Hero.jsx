import hero from "../../../public/hero.jpg"
export default function Hero(){

    return(
        <div style={{background:`url(${hero})`, height:"100vh"}} className="hero relative ">
            <div className="absolute bottom-[47%] left-[30%] text-2xl">
                <h1 className="text-6xl text-[#ed001e] font-bold mb-[2vh]">
                    Order tasty & Fresh Food anytime!
                </h1>
                <p>
                    EASY WAY TO ORDER YOUR FOOD
                </p>
            </div>
        </div>
    )
}