import React from "react";

/**
 * NewBadge component
 * Displays a "New!" badge for posts published within the last 10 calendar days.
 */

interface NewBadgeProps {
  publishedAt: string;
}

/**
 * Determines if a post is "new" based on its publish date.
 * A post is considered new if it was published within the last 10 calendar days (240 hours).
 * Future dates are also considered new.
 *
 * @param publishedAt - ISO date string of the post's publish date
 * @param now - Optional current date (defaults to new Date()) for testability
 * @returns true if the post is within 10 days of `now`, false otherwise
 */
export function isNew(publishedAt: string, now?: Date): boolean {
  if (!publishedAt) {
    return false;
  }

  const publishDate = new Date(publishedAt);

  if (isNaN(publishDate.getTime())) {
    return false;
  }

  const currentDate = now ?? new Date();
  const diffTime = currentDate.getTime() - publishDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  return diffDays <= 10;
}

export const NewBadge: React.FC<NewBadgeProps> = ({ publishedAt }) => {
  if (!isNew(publishedAt)) {
    return null;
  }

  return <div className="background-new">New!</div>;
};

export default NewBadge;
