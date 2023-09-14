import Head from "next/head";
import Image from "next/image";
import { TEST_ADDRESS } from "@/utils/constants";
import styles from "@/styles/Home.module.css";
import NFTGallery from "@/components/NftGallery";
import LearningPathGallery from "@/components/LearningPathGallery";
import { formatAddress } from "@/utils/utils";

export default function Home() {
  return (
    <>
      <Head>
        <title>Learn Web3</title>
        <meta
          name="description"
          content="We are a web3 learning platform which including web3 technology course, interpretation of various concepts in the web3 world, and how to build and experience web3 dapps or apps."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
          <p>
            Test Address:&nbsp;
            <code className={styles.code}>{formatAddress(TEST_ADDRESS)}</code>
          </p>
        </div>
        <div className={styles.center} />
        <LearningPathGallery />
        <NFTGallery />
      </main>
    </>
  );
}
