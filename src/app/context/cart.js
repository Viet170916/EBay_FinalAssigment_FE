"use client"
import { useRouter } from 'next/navigation';
import {createContext , useContext , useState , useEffect} from 'react';

const Context = createContext();

const CartProvider = ({children})=>{
    const router = useRouter();

    const [isItemAdded , setIsItemAdded] = useState(false);
    
    const getCart = ()=>{
        let cart = [];
        if(typeof localStorage !== "undefined"){
            // either return the items or return the empty array.
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        }
        return cart
    }
    
    const addToCart = (product)=>{
        let cart = [];
        if(typeof localStorage !== "undefined"){
            // either return the items or return the empty array.
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        }
        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));
        IsItemAddedToCart(product);
        router.refresh();
    }
    
    const removeFromCart=(product)=>{
        let cart = [];
        if(typeof localStorage !== "undefined"){
            // either return the items or return the empty array.
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        }
        cart = cart.filter(item => item.id !== product?.id)
        localStorage.setItem("cart", JSON.stringify(cart));
        IsItemAddedToCart(product);
        router.refresh();
    }
    
    const IsItemAddedToCart=(product)=>{
        let cart = [];
        if(typeof localStorage !== "undefined"){
            // either return the items or return the empty array.
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        }
        cart = cart.filter(item => item.id === product.id)
        if(cart.length > 0){
            setIsItemAdded(true);
            return
        }
        
        setIsItemAdded(false)
        
    }
    
    const cartCount=()=>{
        let cart = [];
        if(typeof localStorage !== "undefined"){
            // either return the items or return the empty array.
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        }
        return cart.length;
    }
    
    const cartTotal=()=>{
        let total = 0;
        let cart = [];
        
        if(typeof localStorage !== "undefined"){
            // either return the items or return the empty array.
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        }

        for(let i=0; i < cart.length ; i++){
            const element = cart[i];

            total += element.price
        }

        return total;

    }


    const clearCart=()=>{
        localStorage.removeItem("cart");
        router.refresh();
    }


    return (
        <>
            <Context.Provider value={{
                addToCart,getCart, cartCount , cartTotal , clearCart
                ,isItemAdded , IsItemAddedToCart , removeFromCart
                }}>
                {children}
            </Context.Provider>
        </>
    )
}


export const useCart=()=>{
    return useContext(Context);
}

export default CartProvider;