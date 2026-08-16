import React from "react";
import styles from "./CardImageArea.module.css";

interface CardImageAreaProps {
  imageUrl: string | null;
  alt: string;
}

/**
 * CardImageArea component
 *
 * Renders the sharp main image inside a FIXED-SIZE clip container.
 * The container has overflow:hidden so the hover scale animation is
 * clipped and the image area never changes size.
 *
 * The image is positioned absolute (upper-right of the card) by the
 * parent CardComponent's `.imageClip` wrapper styles.
 *
 * Hover animation (scale 1.1x) is triggered by the parent card via the
 * global `carousel-main-image` class.
 */
export const CardImageArea: React.FC<CardImageAreaProps> = ({
  imageUrl,
  alt,
}) => {
  return (
    <div className={styles.imageClip}>
      <img
        className={`${styles.mainImage} carousel-main-image`}
        src={imageUrl ?? "/noimg.png"}
        alt={alt}
      />
    </div>
  );
};

export default CardImageArea;
