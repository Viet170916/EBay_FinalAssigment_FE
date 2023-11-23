"use client";
import CarouselComp from "./components/CarouselComp";
import MainLayout from "./layouts/MainLayout";
import logo from "../../public/images/banner/2.png";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import useIsLoading from "./hooks/useIsLoading";
export default function Home() {
  const [products , setProducts] = useState([]);

  const getProducts=async()=>{
    useIsLoading(true);

    const products = await fetch("/api/products")
    const prod = await products.json();

    setProducts([])
    setProducts(prod);
   useIsLoading(false); 
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <>
      <MainLayout>
        <CarouselComp />
        <div className="max-w-[1200px] mx-auto">Products</div>

        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => {
            return (
              <>
                <Product key={product.id} product={product} />
              </>
            );
          })}
        </div>
      </MainLayout>
    </>
  );
}
