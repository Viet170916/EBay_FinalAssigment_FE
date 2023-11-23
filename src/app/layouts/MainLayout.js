"use client"

import TopMenu from "./includes/TopMenu"
import MainHeader from "./includes/MainHeader"
import SubMenu from "./includes/SubMenu"
import Footer from "./includes/Footer"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"

export default function MainLayout({children}){

    const [isLoading , setIsLoading] = useState(false);
    useEffect(()=>{
        window.addEventListener("storage" , ()=>{
            let res = localStorage.getItem("isLoading");
            res === "false" ? setIsLoading(false) : setIsLoading(true)
        })
    },[])
    return(
        <>
            <div id="MainLayout" className="min-w-[1050px] max-w-[1300px] mx-auto">
                <div>
                {isLoading ? <Loading /> : <div></div>}
                    <TopMenu />
                    <MainHeader />
                    <SubMenu />

                    {/* here all the dynamic pages will load in children */}
                    {children}

                    <Footer />
                </div>
            </div>
        </>
    )
}