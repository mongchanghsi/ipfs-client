import styles from "./index.module.scss";
import Dropzone from "react-dropzone";
import { useState } from "react";
import Image from "next/image";
import { uploadToIpfsWithNFTStorage } from "../../utils/nftStorage/api";
import { getIpfsUrl } from "../../utils/index";
import { makeFileObjects, storeFiles } from "../../utils/nftStorage/utils";
// import { makeFileObjects, storeFiles } from "../../utils/web3Storage/utils";

const NFTStorageInterface = () => {
  // For Image file
  const [file, setFile] = useState<File>();

  // For Text upload
  const [text, setText] = useState<string>("");

  const [responseCid, setResponseCid] = useState<string>("");

  const displayImageFromFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    return <Image src={objectUrl} alt={`${file.name}`} layout="fill" />;
  };

  const handleUploadViaAPI = async () => {
    console.log("Uploading via NFT.Storage API");
    if (file) {
      const _cid = await uploadToIpfsWithNFTStorage(file);
      setResponseCid(_cid);
    } else if (text) {
      const fileObject = makeFileObjects(
        { text: text },
        "RandomFileNameUploadViaAPI"
      );
      const _cid = await uploadToIpfsWithNFTStorage(fileObject[0]);
      setResponseCid(_cid);
    }
  };

  const handleUploadViaSDK = async () => {
    console.log("Uploading via NFT.Storage SDK");
    if (file) {
      const _cid = await storeFiles([file]);
      setResponseCid(_cid);
    } else if (text) {
      const fileObject = makeFileObjects(
        { text: text },
        "RandomFileNameViaSDK"
      );
      const _cid = await storeFiles(fileObject);
      setResponseCid(_cid);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>NFT.Storage</h3>
        <p>
          This interfaces utilises NFT.Storage&apos;s API and SDK to upload
          files. <br />
          You can either upload a file directly or insert some text. However, it
          will prioritise the upload for file first.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Insert text here"
        />

        {file && (
          <div className={styles.previewImage}>
            {displayImageFromFile(file)}
          </div>
        )}
        <Dropzone
          onDrop={(acceptedFiles) => {
            setFile(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )[0]
            );
          }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <span className={styles.dropzone_text}>
                Drop file here, or click to select file
              </span>
            </div>
          )}
        </Dropzone>
      </div>

      <div className={styles.main_buttons}>
        <button type="button" onClick={handleUploadViaAPI}>
          Upload via API
        </button>
        <button type="button" onClick={handleUploadViaSDK}>
          Upload via SDK
        </button>
      </div>

      {responseCid && (
        <>
          <h3>The response cid is: {responseCid}</h3>
          <h3>
            The ipfs url is:{" "}
            <a href={getIpfsUrl(responseCid)} target="_blank" rel="noreferrer">
              {getIpfsUrl(responseCid)}
            </a>
          </h3>
        </>
      )}
    </div>
  );
};

export default NFTStorageInterface;
