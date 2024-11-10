"use client"

import Image from "next/image"
import Link from "next/link"
import {BsChevronDown} from 'react-icons/bs'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import flag from '../../../../public/flag.png';


import {useState} from "react"
import {useUser} from "@/app/context/user"
import {useCart} from "@/app/context/cart"
import axios from "axios";

export default function TopMenu() {
    const user = useUser();
    const cart = useCart();
    console.log('userDATA', user);
    const [isMenu, setIsMenu] = useState(false);
    const handleMenu = () => {
        setIsMenu(!isMenu);
    }
    const isLoggedIn = () => {
        if (user && user?.id) {
            return (
                <>
                    <button onClick={handleMenu} className="flex items-center gap-2 hover:underline cursor-pointer">
                        <div>Hi, {user?.name} </div>
                        <BsChevronDown/>
                    </button>
                </>
            )
        }
        // else
        return (
            <Link href={"/auth"} className="flex items-center gap-2 hover:underline cursor-pointer">
                <div>
                    <h1>Login</h1>
                </div>
                <BsChevronDown/>
            </Link>
        )
    }
    return (
        <>
            <div id="TopMenu" className="border-b">
                <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <ul
                        id="TopMenuLeft"
                        className="flex items-center text-[11px] text-[#333333] px-2 h-8"
                    >
                        <li
                            className="relative px-3"
                        >

                            {
                                isLoggedIn()      // here you can use Ternary operator for user ? () : ()
                            }
                            <div id="authDropDown"
                                 className={`${isMenu ? "visible" : "hidden"}  absolute bg-white w-[200px] text-[#333333] z-40 top-[20px] left-0 border shadow-lg`}>
                                <div className="flex items-center justify-start gap-1 p-3">
                                    {/* <Image width={50} height={50} src={user?.picture} alt="user-image" /> */}
                                    <img src={user?.picture} width={50} height={50} alt="user-image"/>
                                    <p className="font-bold text-[13px]">{user?.name}</p>
                                </div>
                                <div className="border-b"/>
                                <ul className="bg-white">
                                    <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer">
                                        <Link href={'/orders'}>
                                            My orders
                                        </Link>
                                    </li>
                                    <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer">

                                        {user?.role === "vendor" ?
                                            <Link href={'/product/create'}>
                                                Create product
                                            </Link> :
                                            <Link href={"#"} onClick={(e) => {
                                                e.preventDefault();
                                                if (user?.id) {
                                                    axios.post("http://localhost:5180/api/account/registering-vendor/" + user?.id,).then(res => {
                                                        if (res.data?.isVendor) {
                                                            user.setUser(u => ({...u, role: "vendor"}));
                                                            user.setRole("vendor");
                                                        }
                                                    });
                                                }
                                            }}>
                                                Ready to be vendor
                                            </Link>}

                                    </li>
                                    <li onClick={() => {
                                        user?.signOut();
                                        setIsMenu(false)
                                    }}
                                        className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer">
                                        Sign out
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li className="px-3 hover:underline cursor-pointer">
                            Daily Deals
                        </li>
                        <li className="px-3 hover:underline cursor-pointer">
                            Help and Contact
                        </li>
                    </ul>

                    {/* Right Nav Part */}
                    <ul
                        id="TopMenuRight"
                        className="flex items-center text-[11px] text-[#333333] px-2 h-8"
                    >
                        <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
                            <Image src={flag} width={30} height={30} alt="flag"/>
                            <p>Ship to</p>
                        </li>
                        <Link href={'/cart'} className="px-3 hover:underline cursor-pointer">
                            <div className="relative">
                                <AiOutlineShoppingCart size={22}/>
                                {
                                    cart.cartCount() > 0 ? <div
                                        className="absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white">
                                        <div className="flex items-center justify-center -mt-[1px]">
                                            {cart.cartCount()}
                                        </div>
                                    </div> : <div></div>
                                }
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    )
}