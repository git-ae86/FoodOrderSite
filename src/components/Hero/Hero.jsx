import hero from "../../../public/hero.jpg"
export default function Hero(){

    return(
        <div style={{background:`url(${hero})`, height:"100vh"}} className="hero relative ">
            <div className="absolute bottom-[30%] min-[380px]:bottom-[47%] left-[3%] min-[443px]:left-[10%] min-[560px]:left-[20%] min-[1176px]:left-[30%] text-2xl">
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