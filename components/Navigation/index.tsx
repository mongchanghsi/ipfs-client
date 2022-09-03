import styles from "./index.module.scss";

const Navigation = () => {
  return (
    <nav id="Navigation" className={styles.container}>
      <div className={styles.main}>
        <h2>
          <span>IPFS</span> Client
        </h2>
      </div>
    </nav>
  );
};

export default Navigation;
