import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

// Disable bodyParser for file uploads (required in Next.js)
export const config = {
  api: {
    bodyParser: false,
  },
};

// POST handler for file upload
export async function POST(req) {
  try {
    // Parse the incoming form data using formidable
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
    const fileStream = fs.createReadStream(file.filepath); // file.filepath is the path to the uploaded file

    // Upload the file to S3
    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME, // Replace with your bucket name
      Key: file.originalFilename, // The file name
      Body: fileStream, // The file content
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Return success response
    return NextResponse.json({
      success: true,
      message: `File uploaded successfully to S3: ${file.originalFilename}`,
    });
  } catch (error) {
    // Return error response
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
