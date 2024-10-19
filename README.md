<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README</title>
</head>
<body>
    <h1>Next.js Project</h1>
    <p>This is a <a href="https://nextjs.org">Next.js</a> project bootstrapped with <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app">create-next-app</a>.</p>

    <h2>Getting Started</h2>
    <p>First, run the development server:</p>

    <pre>
<code>
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
</code>
    </pre>

    <p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>
    <p>You can start editing the page by modifying <code>app/page.js</code>. The page auto-updates as you edit the file.</p>

    <p>This project uses <a href="https://nextjs.org/docs/app/building-your-application/optimizing/fonts">next/font</a> to automatically optimize and load <a href="https://vercel.com/font">Geist</a>, a new font family for Vercel.</p>

    <h2>Learn More</h2>
    <p>To learn more about Next.js, take a look at the following resources:</p>
    <ul>
        <li><a href="https://nextjs.org/docs">Next.js Documentation</a> - learn about Next.js features and API.</li>
        <li><a href="https://nextjs.org/learn">Learn Next.js</a> - an interactive Next.js tutorial.</li>
    </ul>
    <p>You can check out the <a href="https://github.com/vercel/next.js">Next.js GitHub repository</a> - your feedback and contributions are welcome!</p>

    <h2>Deploy on Vercel</h2>
    <p>The easiest way to deploy your Next.js app is to use the <a href="https://vercel.com/new?utm_medium=default-template&amp;filter=next.js&amp;utm_source=create-next-app&amp;utm_campaign=create-next-app-readme">Vercel Platform</a> from the creators of Next.js.</p>
    <p>Check out our <a href="https://nextjs.org/docs/app/building-your-application/deploying">Next.js deployment documentation</a> for more details.</p>

    <h2>API Routes</h2>
    <p>This project has an example API route for uploading files to an S3 bucket using AWS SDK.</p>

    <h3>Upload to S3</h3>
    <p>To upload files to S3, the <code>POST</code> route accepts form data with the <code>file</code> field. The file is then uploaded to the S3 bucket defined by environment variables.</p>

    <p>Example API route is defined in <code>app/api/upload/route.js</code>:</p>

    <pre>
<code>
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: file,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
</code>
    </pre>

    <h3>Environment Variables</h3>
    <p>Make sure you configure the following environment variables in your <code>.env.local</code> file:</p>

    <pre>
<code>
AWS_S3_ACCESS_KEY_ID=your-access-key-id
AWS_S3_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_REGION=your-region
</code>
    </pre>

    <p>You can obtain these values from your AWS Management Console.</p>

    <h2>Running Tests</h2>
    <p>If you have unit or integration tests set up, you can run them using the following commands:</p>

    <pre>
<code>
npm run test
# or
yarn test
</code>
    </pre>

    <p>Make sure to add relevant test files in the <code>__tests__</code> directory.</p>

    <h2>Deployment</h2>
    <p>To deploy your project to Vercel:</p>
    <ol>
        <li>Create a new project in <a href="https://vercel.com/new">Vercel</a>.</li>
        <li>Connect your GitHub repository.</li>
        <li>Set up the required environment variables under the Vercel project settings.</li>
    </ol>
    <p>Once you push to the main branch, Vercel will automatically build and deploy your project.</p>

    <p>For more details, refer to the <a href="https://nextjs.org/docs/deployment">Vercel deployment guide</a>.</p>
</body>
</html>
