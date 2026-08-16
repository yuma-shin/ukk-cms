import React from "react";
import { Post } from "types/blog";
import { CardImageArea } from "./CardImageArea";
import { NewBadge } from "./NewBadge";
import { DateTime } from "components/DateTime";
import styles from "./CardComponent.module.css";

interface CardComponentProps {
  post: Post;
  detailPath: string;
}

const POPUP_FEATURES =
  "width=680,height=550,status=no,location=no,scrollbars=yes,directories=no,menubar=no,resizable=no,toolbar=no";

/**
 * CardComponent
 *
 * The ENTIRE card is a single clickable link:
 * - External (post.directlink present): opens the URL in a new tab.
 * - Internal (no directlink): opens the detail page in a fixed-size popup window.
 *
 * Layout:
 * - `.blurBg`  : single relative blur surface holding the text content.
 * - CardImageArea (`.imageClip`) : sharp main image, absolute, upper-right,
 *                fixed size with overflow:hidden so the hover scale is clipped.
 */
export const CardComponent: React.FC<CardComponentProps> = ({
  post,
  detailPath,
}) => {
  const imageUrl = post.image?.url ?? null;
  const categoryLabel = post.category || "None";
  const isExternal = Boolean(post.directlink);
  const href = isExternal ? post.directlink : `${detailPath}${post.id}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal) {
      e.preventDefault();
      window.open(href, "_blank", POPUP_FEATURES);
    }
  };

  return (
    <a
      className={styles.card}
      href={href}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {/* Single blur background surface (relative) — holds text at bottom */}
      <div className={styles.blurBg}>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.categoryTag}>{categoryLabel}</span>
            <span className={styles.date}>
              <DateTime datetime={post.publishedAt || ""} />
            </span>
          </div>

          <span className={styles.titleLink}>{post.title}</span>

          <p className={styles.description}>{post.description}</p>
        </div>
      </div>

      {/* Main image (absolute, upper-right, overlapping the blur) */}
      <CardImageArea imageUrl={imageUrl} alt={post.title} />

      {/* New badge */}
      <div className={styles.badge}>
        <NewBadge publishedAt={post.publishedAt || ""} />
      </div>
    </a>
  );
};

export default CardComponent;
