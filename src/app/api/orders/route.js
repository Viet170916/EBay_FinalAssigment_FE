import prisma from "@/app/libs/Prisma";
// import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
// import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {bucketName, s3_v2} from "@/AWS";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export async function POST(req) {
    // const supabase = createServerComponentClient({cookies});

    try {

        const body = await req.json();
        // return NextResponse.json([body]);

        const user = {id: body.supabaseId};
        console.log("user", user)

        if (!user) throw Error();

        const orders = await prisma.orders.findMany({
            where: {
                user_id: user?.id
            },
            orderBy: {
                id: "desc"
            },
            include: {
                orderItem: {
                    include: {
                        product: true
                    }
                }
            }
        });

        for (let i = 0; i< orders.length; i++) {
            for (let j = 0; j< orders[i].orderItem.length; j++) {
                const params = {
                    Bucket: bucketName,
                    Key: orders[i].orderItem[j].product.url,
                    // ContentType: post.type,
                };
                const command = new GetObjectCommand(params);
                orders[i].orderItem[j].product.url = await getSignedUrl(s3_v2, command, {expiresIn: 3600});
            }

        }

        await prisma.$disconnect();
        return NextResponse.json(orders);

    } catch (error) {
        console.log('error', error);
        await prisma.$disconnect();

        return new NextResponse("Something went wrong", {status: 400})
    }
}