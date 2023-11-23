"use client"

import MainLayout from "@/app/layouts/MainLayout"
import SimilarProducts from "@/app/components/SimilarProducts.js"
import logo from "../../../../public/dummy-product.jpg";
import Image from "next/image";
import { useCart } from "@/app/context/cart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useIsLoading from "@/app/hooks/useIsLoading";

export default function Product({params}){
    const cart = useCart();
    const [products, setProducts] = useState({});

    const getProduct = async()=>{
        useIsLoading(true);
        setProducts({});

        const response = await fetch(`/api/product/${params?.id}`)
        const prod = await response.json();

        setProducts(prod);
        cart.IsItemAddedToCart(prod);
        useIsLoading(false)
    }
    
    useEffect(()=>{
        getProduct()
    },[])
console.log('products',products);
    return(
        <>
            <MainLayout>
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex px-4 py-10">
                        {
                            products.url ? <img className="w-[40%] h-[270px] object-cover rounded-lg" src={products?.url+'/280'} alt="product-image"/> : <div className="w-[40%]"></div>
                        }

                        <div className="px-4 w-full">
                            <div className="font-bold text-xl">{products?.title}</div>
                            <div className="text-sm text-gray-700 pt-2">Brand New - Full Warranty</div>
                            
                            <div className="py-1 border-b"/>
                        
                            <div className="pt-3 pb-2">
                                <div className="flex items-center">
                                    Condition: <span className="font-bold text-[17px] ml-2">New</span>
                                </div>
                            </div>

                            <div className="py-1 border-b"/>

                            <div className="pt-3">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center">
                                        Price:
                                        {products?.price ? <div className="font-bold text-[20px] ml-2">
                                            GBP ₹{(products?.price / 100).toFixed(2)}
                                        </div> : null}
                                    </div>

                                    <button 
                                        onClick={()=>{
                                            if(cart.isItemAdded){
                                                cart.removeFromCart(products);
                                                toast.info("Removed From Cart", {
                                                    autoClose: 3000
                                                })
                                            }
                                            else{
                                                cart.addToCart(products);
                                                toast.success("Added to Cart", {
                                                    autoClose:3000
                                                })
                                            }
                                        }}
                                    className={`bg-[#349BC9] text-white py-2 px-20 rounded-full cursor-pointer
                                        ${cart.isItemAdded ? "bg-[#e9a321] hover:bg-[#bf861a]" : "bg-[#3498c9] hover:bg-[#0054a0]" }
                                    `}>
                                        {
                                            cart.isItemAdded ? "Remove From Cart" : "Add to Cart"
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="py-1 border-b"/>

                            <div className="pt-3">
                                <div className="font-semibold pb-1">Description:</div>
                                <div className="text-sm">{products?.description}</div>
                            </div>
                        </div>
                    </div>
                </div>


                <SimilarProducts />
            </MainLayout>
        </>
    )
}