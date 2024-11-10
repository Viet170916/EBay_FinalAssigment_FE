import Stripe  from 'stripe'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/Prisma";
export async function POST(req){
    const supabase = createServerComponentClient({cookies});

    try {
        const body = await req.json();
        const {data:{user}} =  await supabase.auth.getUser();

        if(!user) throw Error();

        const stripe = new Stripe(process.env?.STRIPE_SK_KEY || "")
        
        const res = await stripe.paymentIntents.create({
            amount : Number(body?.amount),
            currency: "USD",
            automatic_payment_methods:{
                enabled: true
            }
        })

        return NextResponse.json(res);
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse(error,{status: 400})
    }
}