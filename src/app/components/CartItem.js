"use client"

import { BiLoader } from "react-icons/bi";
import logo from "../../../public/dummy-product.jpg";
import Product from "./Product";
import Image from "next/image";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

export default function CartItem({products}){
    const cart = useCart();
    const removeItemFromCart=()=>{
        let res =confirm(`Are you sure you want to remove this ? "${products?.title}`)
    
        if(res){
            cart.removeFromCart(products);
            toast.info("Removed from cart", {autoClose: 3000})

        }
        
    }
    return(
        <>
            <div className="relative flex justify-start my-2 border w-full p-6">
                <Image width={150} height={150} src={products?.url+"/270"} alt="cart-img" className="rounded-md"/>
            
                <div className="overflow-hidden pl-2 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center font-semibold justify-between w-[400px] text-[16px] underline">
                            {products?.title}
                        </div>
                        <div className="font-bold text-lg">
                            ₹{(products?.price / 100).toFixed(2)}
                        </div>
                    </div>

                    <div className="font-semibold mt-2">
                        NEW
                    </div>

                    <div className="text-sm mt-2">
                        {products?.description.substring(0,150)}...
                    </div>

                    <div className="absolute right-0 bottom-0 p-4 text-sm">
                        <button onClick={()=>removeItemFromCart()} className="underline text-blue-500">
                            Remove
                        </button>       
                    </div>
                </div>

            </div>

        </>
    )
}