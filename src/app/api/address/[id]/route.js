import prisma from "@/app/libs/Prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(){
    const supabase = createServerComponentClient({cookies});

    try {

        const {data:{user}} =  await supabase.auth.getUser();

        if(!user) throw Error();

        const res = await prisma.addresses.findFirst({
            where:{
                user_id: user?.id
            }
        })

        return NextResponse.json(res);
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong",{status: 400})
    }
}