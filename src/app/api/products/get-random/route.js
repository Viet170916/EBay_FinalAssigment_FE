import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import {bucketName, s3_v2} from "@/AWS";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
export async function GET(){
    try {

        const productsCount = await prisma.products.count();
        const skip = Math.floor(Math.random() * productsCount);
        
        const products = await prisma.products.findMany({
            take : 5,
            skip : skip,
            orderBy:{
                id: "asc"
            }
        })
        for (let i = 0; i< products.length; i++) {
            const params = {
                Bucket: bucketName,
                Key: products[i].url,
                // ContentType: post.type,
            };
            const command = new GetObjectCommand(params);
            products[i].url = await getSignedUrl(s3_v2, command, {expiresIn: 3600});
        }

        await prisma.$disconnect();
        return NextResponse.json(products);
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong",{status: 400})
    }
}