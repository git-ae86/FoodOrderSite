import logo from '../../../public/cropped_image.png';
export default function Navbar(){

    return(
        <nav className='text-[#c3c3c3] text-xl flex justify-between px-8 py-2 items-center'>
            <div className="logo h-[7vh] w-[3.8vw] object-none">
                <img src={logo} className="h-[100%] w-[100%] rounded-full" alt="logo" />
            </div>
            <ul className='flex justify-between w-[30%]'>
                <li className='hover:cursor-pointer hover:text-[#f05a35]'>Home</li>
                <li className='hover:cursor-pointer hover:text-[#f05a35]'>Reviews</li>
                <li className='hover:cursor-pointer hover:text-[#f05a35]'>Cart</li>
            </ul>
            <div>
                <button className='text-xl mr-4 hover:text-[#f05a35]'>Sign up</button>
                <button className='hover:text-[#f05a35]'>Login</button>
            </div>
        </nav>
    )
}