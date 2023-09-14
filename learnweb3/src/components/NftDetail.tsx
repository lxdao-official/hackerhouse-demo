/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Link,
  List,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import type { NFT } from "@/api/types";
import { getTokenId, formatAddress } from "@/utils/utils";
import styles from "@/styles/NftGallery.module.css";

import { Thumbnail, VerifiedIcon } from "./NftCard";

interface NftDetailProps {
  nft?: NFT;
  isOpen: boolean;
  onClose: () => void;
}

export default function NftDetail(props: NftDetailProps) {
  const { nft, onClose, isOpen } = props;
  const [tokenId, setTokenId] = useState(0);

  useEffect(() => {
    if (nft) {
      setTokenId(getTokenId(nft));
    }
  }, [nft]);

  const handleGoTo = (nft?: NFT) => {
    if (nft) {
      const { contract } = nft;
      const openSeaUrl = `https://opensea.io/assets/ethereum/${contract.address}/${tokenId}`;
      window.open(openSeaUrl, "_blank");
    }
  };

  return (
    <Modal size="5xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {`${nft?.contractMetadata?.name ?? nft?.title}` + ` #${tokenId}`}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ display: "flex" }}>
          <div className={styles.nft_detail_image_container}>
            <Thumbnail
              title={nft?.title}
              media={nft?.media}
              style={{ width: 320, height: 360, borderRadius: 8 }}
            />
          </div>
          <div style={{ marginLeft: 20, flex: 1 }}>
            <Box display="flex" alignItems="center">
              <Link
                isExternal
                color="blue"
                href={nft?.contractMetadata?.openSea?.externalUrl}
              >
                {nft?.contractMetadata?.openSea?.collectionName}
              </Link>
              <VerifiedIcon
                style={{ maxHeight: 20, marginLeft: 6 }}
                status={nft?.contractMetadata?.openSea?.safelistRequestStatus}
              />
            </Box>
            <Text
              paddingTop="2"
              paddingBottom="2"
              style={{ fontWeight: "bold" }}
            >
              Details
            </Text>
            <List marginBottom="5">
              <ListItem display="flex" justifyContent="space-between">
                <Text color="gray.500">Contract Address</Text>
                <Link
                  isExternal
                  color="blue"
                  href={`https://etherscan.io/address/${nft?.contract?.address}`}
                >
                  {formatAddress(nft?.contract?.address)}
                </Link>
              </ListItem>
              <ListItem
                paddingTop="2"
                display="flex"
                justifyContent="space-between"
              >
                <Text color="gray.500">Token ID</Text>
                <Text>{tokenId}</Text>
              </ListItem>
              <ListItem
                paddingTop="2"
                display="flex"
                justifyContent="space-between"
              >
                <Text color="gray.500">Token Standard</Text>
                <Text>{nft?.contractMetadata?.tokenType}</Text>
              </ListItem>
              <ListItem
                paddingTop="2"
                display="flex"
                justifyContent="space-between"
              >
                <Text color="gray.500">Chain</Text>
                <Text>Ethereum</Text>
              </ListItem>
            </List>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton paddingLeft={0} paddingRight={0}>
                    <Box as="b" flex="1" textAlign="left">
                      Attributes
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} paddingLeft={0} paddingRight={0}>
                  <List>
                    {nft?.metadata?.attributes &&
                      nft?.metadata?.attributes.map((item, index) => (
                        <ListItem
                          paddingTop="2"
                          display="flex"
                          justifyContent="space-between"
                          key={item.trait_type + index}
                        >
                          <Text color="gray.500">{item.trait_type}</Text>
                          <Text>{item.value}</Text>
                        </ListItem>
                      ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton paddingLeft={0} paddingRight={0}>
                    <Box as="b" flex="1" textAlign="left">
                      Description
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} paddingLeft={0} paddingRight={0}>
                  {nft?.contractMetadata?.openSea?.description}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="blue.400" onClick={() => handleGoTo(nft)}>
            Go to Opensea
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
