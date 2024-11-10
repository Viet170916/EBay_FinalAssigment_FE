import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import prisma from "@/app/libs/Prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
    const supabase = createServerComponentClient({cookies});

    try {
        const body = await req.json();
        const {data: {user}} = await supabase.auth.getUser();


        if (!user) throw Error();

        await prisma.products.create({
            data: {
                // user_id: user?.id,
                title: body?.title,
                description: body?.description,
                url: body?.url,
                created_at: new Date(),
                price: Number(body?.price),
            }
        })

        await prisma.$disconnect();
        return NextResponse.json("Product Complete", {status: 200});

    } catch (error) {
        console.log('error', error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong", {status: 400})
    }
}