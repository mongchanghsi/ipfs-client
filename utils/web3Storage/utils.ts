import { Web3Storage } from "web3.storage";
import envConfig from "../envConfig";

export const makeStorageClient = () => {
  if (!envConfig.WEB3STORAGE_API_KEY) return null;
  return new Web3Storage({ token: envConfig.WEB3STORAGE_API_KEY });
};

export const makeFileObjects = (obj: any, filename: string): File[] => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [new File([blob], `${filename}.json`)];
  return files;
};

export const storeFiles = async (files: File[]): Promise<string> => {
  const client = makeStorageClient();
  if (!client) return "";

  // Note that it takes in an array of Files
  const cid = await client.put(files);
  return cid;
};
