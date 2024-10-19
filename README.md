This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## S3 Bucket Configuration

To configure the S3 bucket, you need to create a `.env.local` file in the root directory of the project and add the following environment variables:

```bash
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket-name
```

## S3 IAM Policy

To configure the S3 bucket, you need to create an IAM policy with the following permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:ListBucketMultipartUploads"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:AbortMultipartUpload",
                "s3:ListMultipartUploadParts"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

## s3 and next.js

To use the S3 bucket with Next.js, you need to install the following dependencies:

```bash
npm install @aws-sdk/client-s3
# or
yarn add @aws-sdk/client-s3
# or
pnpm add @aws-sdk/client-s3
# or
bun add @aws-sdk/client-s3
```

## frontend

To use the frontend, you need to install the following dependencies:

```bash
npm install @geist-ui/react
# or
yarn add @geist-ui/react
# or
pnpm add @geist-ui/react
# or
bun add @geist-ui/react
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### s3_web_store_nextjs/.env.local[]: # Path: s3_web_store_nextjs/.env.local
```bash
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket-name
```

## structure of the project image 

```plaintext
s3_web_store_nextjs
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── FileUpload.js
│   │   └── Layout.js
│   ├── pages
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js
│   │   └── upload.js
│   └── styles
│       └── Home.module.css
├── tsconfig.json
└── yarn.lock
```



