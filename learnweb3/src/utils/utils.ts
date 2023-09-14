import type { NFT } from "@/api/types";

export function getTokenId(nft: NFT) {
  const {
    id: { tokenId },
  } = nft;
  const tokenIdLength = tokenId.length;
  return Number(`0x${tokenId.slice(tokenIdLength - 5, tokenIdLength)}`);
}

export function formatAddress(address?: string, start = 6, end = 4) {
  if (!address) return "";

  const length = address.length;
  const startStr = address.slice(0, start);
  const endStr = address.slice(length - end, length);

  return `${startStr}...${endStr}`;
}
