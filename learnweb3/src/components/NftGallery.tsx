import { useState, Suspense } from "react";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import styles from "@/styles/NftGallery.module.css";
import { TEST_ADDRESS } from "@/utils/constants";
import { NftDataResponse, fetchNftData } from "@/api/fetchNftList";
import type { NFT } from "@/api/types";

import NftCard from "./NftCard";
import NftDetail from "./NftDetail";

interface GalleryListProps {
  resource: NftDataResponse;
}

function GalleryList({ resource }: GalleryListProps) {
  const [selected, setSelected] = useState<NFT>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ownedNfts } = resource.nfts.read() ?? {};

  const handleClick = (nft: NFT) => {
    onOpen();
    setSelected(nft);
  };

  const handleClose = () => {
    onClose();
    setSelected(undefined);
  };

  return (
    <>
      <div className={styles.nfts_display}>
        {ownedNfts?.length ? (
          ownedNfts.map((nft) => {
            return (
              <NftCard key={nft.id.tokenId} nft={nft} onClick={handleClick} />
            );
          })
        ) : (
          <div className={styles.loading_box}>
            <p>No NFTs found for this address</p>
          </div>
        )}
      </div>
      <NftDetail nft={selected} onClose={handleClose} isOpen={isOpen} />
    </>
  );
}

export default function NFTGallery() {
  const [address] = useState(TEST_ADDRESS);
  const resource = fetchNftData(address, 0, 8);

  return (
    <Suspense
      fallback={
        <div className={styles.loading_box}>
          <Spinner color="blue.500" />
        </div>
      }
    >
      <div className={styles.nft_gallery}>
        <h2 className={styles.nft_gallery_title}>Trending</h2>
        <GalleryList resource={resource} />
      </div>
    </Suspense>
  );
}
