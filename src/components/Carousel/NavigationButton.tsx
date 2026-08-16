import React from "react";
import styles from "./NavigationButton.module.css";

interface NavigationButtonProps {
  direction: "prev" | "next";
  className: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  className,
}) => {
  const ariaLabel = direction === "prev" ? "前のスライド" : "次のスライド";

  return (
    <button
      className={`${styles.button} ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      <svg
        className={styles.chevron}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
};
