import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";

//reference :  https://www.youtube.com/watch?v=ClY6vD4WHP0

export async function middleware(req){
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({
        req, res
    })

    const {data} = await supabase.auth.getSession();

    // if there is session and still user trys to go the auth page, throw the user to the main home page
    if(data?.session && req.nextUrl.pathname.startsWith("/auth")){
        return NextResponse.redirect(new URL("/",req.url));
    }


    // means if there is no SESSION and also we are trying to go to this pages , then throw 
    // the user back to the authpage !
    if(!data?.session && (
        req.nextUrl.pathname.startsWith("/checkout") ||
        req.nextUrl.pathname.startsWith("/success") ||
        req.nextUrl.pathname.startsWith("/orders") ||
        req.nextUrl.pathname.startsWith("/address")
    )) {
        return NextResponse.redirect(new URL("/auth" , req.url))
    }


    return res;

}




