"use client"
import Link from "next/link"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Loading() {
  return (
    <>
        <div className="fixed bg-black bg-opacity-70 inset-0 w-full z-50 flex items-center justify-center h-[100vh] overflow-hidden">
            <div className="p-3 rounded-md">
                <AiOutlineLoading3Quarters className="text-blue-400 animate-spin" size={100}/>
                <div className="text-center pt-5 text-xl font-bold text-white">Loading...</div>
            </div>
        </div>
    </>
  )
}
