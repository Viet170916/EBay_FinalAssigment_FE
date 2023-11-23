import prisma from "@/app/libs/Prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req){
    const supabase = createServerComponentClient({cookies});

    try {
        const {name,address,zipcode,city,country} = await req.json();
        const {data:{user}} =  await supabase.auth.getUser();

        if(!user) throw Error();

        const res = await prisma.addresses.create({
            data:{
                user_id: user?.id,
                address,
                zipcode,
                city,
                country,
                name
            }
        })
        await prisma.$disconnect();
        return NextResponse.json(res);
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong",{status: 400})
    }
}