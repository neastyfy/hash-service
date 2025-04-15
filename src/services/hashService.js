import crypto from "crypto";
import { getConfig } from "./configService.js";

export const hashPool = new Set();

const generateHash = async () => {
  const config = await getConfig();

  const hashLength = config.settings.hashLength;
  const byteLength = Math.ceil((hashLength * 3) / 4);
  const randomBytes = crypto.randomBytes(byteLength);

  const base64Hash = randomBytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const hash = base64Hash.substring(0, hashLength);

  return hash;
};

const getHash = async () => {
  if (hashPool.size === 0) {
    return await generateHash();
  }
  const hash = hashPool.values().next().value;
  hashPool.delete(hash);
  fillHashPool();
  return hash;
};

const fillHashPool = async () => {
  const config = await getConfig();
  const poolSize = config.settings.hashPoolSize;

  while (hashPool.size < poolSize) {
    const hash = await generateHash();
    hashPool.add(hash);
  }
};

export default { generateHash, getHash, fillHashPool };
