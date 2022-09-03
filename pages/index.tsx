import type { NextPage } from "next";

import Meta from "../components/Meta";
import styles from "../styles/Main.module.scss";

import Navigation from "../components/Navigation";
import Web3StorageInterface from "../components/Web3Storage";
import NFTStorageInterface from "../components/NFTStorage";
import { useState } from "react";

enum IPFSEnum {
  WEB3STORAGE,
  NFTSTORAGE,
}

const Index: NextPage = () => {
  const [storageType, setStorageType] = useState<IPFSEnum>(
    IPFSEnum.WEB3STORAGE
  );

  return (
    <div className={styles.container}>
      <Meta />
      <Navigation />
      <div className={styles.main}>
        <div className={styles.selection}>
          <div className={styles.selection_options}>
            <div onClick={() => setStorageType(IPFSEnum.WEB3STORAGE)}>
              <p>Web3.Storage</p>
            </div>
            <div onClick={() => setStorageType(IPFSEnum.NFTSTORAGE)}>
              <p>NFT.Storage</p>
            </div>
          </div>

          <div
            className={styles.selection_bar}
            style={{
              marginLeft: storageType == IPFSEnum.NFTSTORAGE ? "20rem" : "0",
            }}
          />
        </div>
        {storageType == IPFSEnum.WEB3STORAGE ? (
          <Web3StorageInterface />
        ) : (
          <NFTStorageInterface />
        )}
      </div>
    </div>
  );
};

export default Index;
