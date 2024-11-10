import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import {bucketName, s3_v2} from "@/AWS";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {GetObjectCommand} from "@aws-sdk/client-s3";
export async function GET(req , context){
    try {
        const {id} = context.params;

        const product = await prisma.products.findFirst({
            where:{
                id: Number(id)
            }
        })
        const params = {
            Bucket: bucketName,
            Key: product.url,
            // ContentType: post.type,
        };
        const command = new GetObjectCommand(params);

        product.url = await getSignedUrl(s3_v2, command, {expiresIn: 3600});

        await prisma.$disconnect();
        return NextResponse.json(product);
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong",{status: 400})
    }
}