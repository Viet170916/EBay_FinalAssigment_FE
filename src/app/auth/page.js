"use client"

import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import Link from "next/link"
import eBayLogo from '../../../public/logo.svg'
import { useEffect, useState } from 'react';

export default function AuthPage(){
    // const [windowOrigin , setWindowOrigin ] = useState(null)
    const supabase = createClientComponentClient();
    // if(typeof window !== undefined){
    // }
    // useEffect(()=>{
    //     setWindowOrigin(window.location.origin)
    // },[])
    return(
        <>
            <div id="AuthPage" className="w-w-full min-h-screen bg-white">
                <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                    <Link href={'/'} className="min-w-[170px]">
                        <Image src={eBayLogo} alt="eBay-Logo" width={170} height={170}/>
                    </Link>
                </div>

                <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                     Login / Register
                </div>

                <div className="max-w-[400px] mx-auto px-2">
                    <Auth 
                        onlyThirdPartyProviders
                        // redirectTo={`${windowOrigin}/auth/callback`}
                        redirectTo={`https://ebay-nextjsclone.vercel.app/auth/callback`}
                        supabaseClient={supabase}
                        providers={['google']}
                        appearance={{
                            theme:ThemeSupa
                        }}
                    />
                </div>
            </div>
        </>
    )
}