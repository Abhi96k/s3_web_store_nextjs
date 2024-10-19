import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as formidable from "formidable";
import fs from "fs";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const form = new formidable.IncomingForm();

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    // Get the uploaded file
    const file = data.files.file;
    const fileStream = fs.createReadStream(file.filepath);

    // Upload the file to S3
    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: file.originalFilename,
      Body: fileStream,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return NextResponse.json({
      success: true,
      message: `File uploaded successfully to S3: ${file.originalFilename}`,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
