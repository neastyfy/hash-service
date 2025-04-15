import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import streamToString from "../utils/streamToString.js";

let cachedConfig = null;

export const loadConfig = async () => {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: process.env.AWS_CONFIG_BUCKET,
    Key: "config.json",
  };

  try {
    const data = await s3.send(new GetObjectCommand(params));
    const body = await streamToString(data.Body);
    const config = JSON.parse(body);
    cachedConfig = config;
    return config;
  } catch (error) {
    throw `Error when trying to load config: ${error}`;
  }
};

export const getConfig = async () => {
  if (!cachedConfig) {
    cachedConfig = await loadConfig();
  }
  return cachedConfig;
};
