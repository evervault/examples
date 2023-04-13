import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'

dotenv.config()

export default async function handler(req, res) {

  const clientParams = {
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.S3_REGION
  };

  const client = new S3Client(clientParams);
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: req.query.file,
    ContentType: req.query.fileType,
  })

  const preSignedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

  res.status(200).json({
    "url": preSignedUrl
  })
}
