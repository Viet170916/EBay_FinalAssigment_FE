import prisma from "@/app/libs/Prisma";
import {NextResponse} from "next/server";
import {bucketName, s3_v2} from "@/AWS";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export async function GET(){
    // let productsResponse=[];
    try {
        const product = await prisma.products.findMany({})
        // productsResponse = product;
        for (let i = 0; i< product.length; i++) {
            const params = {
                Bucket: bucketName,
                Key: product[i].url,
                // ContentType: post.type,
            };
            const command = new GetObjectCommand(params);
            product[i].url = await getSignedUrl(s3_v2, command, {expiresIn: 3600});
        }
        // const params = {
        //     Bucket: bucketName,
        //     Key: product[0].url,
        //     // ContentType: post.type,
        // };
        // const command = new GetObjectCommand(params);
        //
        // product[0].url = await getSignedUrl(s3_v2, command, {expiresIn: 3600});
        await prisma.$disconnect();
        return NextResponse.json(product);
        // return NextResponse.json({url: url});
        
        
    } catch (error) {
        console.log('error',error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong",{status: 400})
    }
}