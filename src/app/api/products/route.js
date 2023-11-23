import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
export async function GET(req){
    try {

        const product = await prisma.products.findMany({})
        await prisma.$disconnect();
        return NextResponse.json(product);
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong",{status: 400})
    }
}