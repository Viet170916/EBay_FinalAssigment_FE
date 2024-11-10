import {S3Client} from "@aws-sdk/client-s3";

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION
});
export const s3_v2 = new S3Client({
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
        },
        region: process.env.NEXT_PUBLIC_AWS_REGION
    }
);
export const s3 = new AWS.S3();
export const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;



