export type ID = {
  tokenId: string;
  tokenMetadata: { tokenType: string };
};

export type Attribute = {
  trait_type: string;
  value: string;
};

export type Metadata = {
  name: string;
  image: string;
  description: string;
  attributes: Attribute[];
};

export type TokenUri = {
  gateway: string;
  raw: string;
};

export type Contract = {
  address: string;
};

export type OpenSea = {
  imageUrl: string;
  floorPrice: string;
  description: string;
  collectionName: string;
  safelistRequestStatus: string;
  twitterUsername: string;
  lastIngestedAt: string;
  externalUrl?: string;
};

export type ContractMetadata = {
  contractDeployer: string;
  deployedBlockNumber: number;
  name: string;
  openSea: OpenSea;
  symbol: string;
  tokenType: string;
  totalSupply: string;
};

export type Media = {
  bytes: number;
  format: string;
  gateway: string;
  raw: string;
  thumbnail: string;
};

export type NFT = {
  title: string;
  balance: string;
  description: string;
  timeLastUpdated: string;
  media: Media[];
  metadata: Metadata;
  contractMetadata: ContractMetadata;
  contract: Contract;
  id: ID;
  tokenUri: TokenUri;
};
