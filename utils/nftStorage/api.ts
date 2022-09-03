import axios from "axios";
import envConfig from "../envConfig";

let apiUrl = "https://api.nft.storage/upload";

const config = {
  headers: {
    Authorization: `Bearer ${envConfig.NFTSTORAGE_API_KEY}`,
    "Content-Type": "application/json",
  },
};

export const uploadToIpfsWithNFTStorage = async (
  file: File
): Promise<string> => {
  try {
    const response = await axios.post(`${apiUrl}`, file, config);
    return response.data.value.cid;
  } catch (error) {
    return "";
  }
};
