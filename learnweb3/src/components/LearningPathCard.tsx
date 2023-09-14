/* eslint-disable @next/next/no-img-element */
import { CSSProperties } from "react";
import styles from "@/styles/NftGallery.module.css";
import type { NFT, Media } from "@/api/types";
import { getTokenId } from "@/utils/utils";

export interface Props {
  nft: NFT;
  onClick?: (nft: NFT) => void;
}

export interface ThumbnailProps {
  title?: string;
  media?: Media[];
  style?: CSSProperties;
}

export function Thumbnail({ title, media, style }: ThumbnailProps) {
  const format = media?.length ? media[0].format : "";
  const thumbnail = media?.length ? media[0].thumbnail : "";

  if (format === "mp4" && media?.length) {
    return (
      <video src={media[0].gateway} controls style={style}>
        Your browser does not support the video tag.
      </video>
    );
  }

  return thumbnail ? (
    <img alt={title} src={`${thumbnail}`} style={style} />
  ) : (
    <img
      alt="Placeholder"
      style={{ objectFit: "scale-down" }}
      src={"/placeholder.png"}
    />
  );
}

export interface VerifiedIconProps {
  status?: string;
  style?: CSSProperties;
}

export function VerifiedIcon({ status, style }: VerifiedIconProps) {
  if (!status) {
    return null;
  }

  return (
    <img
      src={
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
      }
      width="20px"
      height="20px"
      alt="verified"
      style={style}
    />
  );
}

export default function LearningPathCard(props: Props) {
  const { nft, onClick } = props;
  const tokenId = getTokenId(nft);

  return (
    <div
      className={styles.card_container}
      onClick={() => onClick && onClick(nft)}
    >
      <div className={styles.image_container}>
        <Thumbnail title={nft.title} media={nft.media} />
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>
            {`${nft?.contractMetadata?.name ?? nft?.title}` + ` #${tokenId}`}
          </h3>
        </div>
      </div>
    </div>
  );
}
