import axios from "axios";
import envConfig from "../envConfig";

let apiUrl = "https://api.web3.storage/upload";

const config = {
  headers: {
    Authorization: `Bearer ${envConfig.WEB3STORAGE_API_KEY}`,
    "Content-Type": "application/json",
  },
};

export const uploadToIpfsWithWeb3Storage = async (
  file: File
): Promise<string> => {
  try {
    const response = await axios.post(`${apiUrl}`, file, config);
    return response.data.cid;
  } catch (error) {
    return "";
  }
};
