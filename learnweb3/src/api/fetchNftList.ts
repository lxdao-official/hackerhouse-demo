import type { WrapPromiseType } from "@/utils/wrapPromise";
import { wrapPromise } from "@/utils/wrapPromise";
import { GET_NFTS } from "@/utils/constants";
import type { NFT } from "./types";

export interface OwnedNftResponse {
  blockHash: string;
  ownedNfts: NFT[];
  totalCount: number;
}

async function fetchOwnedNfts(
  address: string,
  pageKey: number = 0,
  pageSize: number = 10
): Promise<OwnedNftResponse> {
  const init = {
    method: "get",
    redirect: "follow",
  };
  return await fetch(
    `${GET_NFTS}?owner=${address}&withMetadata=true&pageKey=${pageKey}&pageSize=${pageSize}`,
    init as RequestInit
  ).then((res) => res.json());
}

export interface NftDataResponse {
  nfts: WrapPromiseType<OwnedNftResponse>;
}

export function fetchNftData(
  address: string,
  pageKey?: number,
  pageSize?: number
): NftDataResponse {
  let nftsPromise = fetchOwnedNfts(address, pageKey, pageSize);

  return {
    nfts: wrapPromise(nftsPromise),
  };
}
