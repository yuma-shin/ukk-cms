import React from 'react';

interface FixedWindowLinkProps {
  href: string;
  children: React.ReactNode;
}

const WINDOW_FEATURES =
  'width=680,height=550,status=no,location=no,scrollbars=yes,directories=no,menubar=no,resizable=no,toolbar=no';

/**
 * A link that opens its href in a fixed-size popup window.
 * Shared utility extracted from info/topix page carousel cards.
 */
export const FixedWindowLink: React.FC<FixedWindowLinkProps> = ({ href, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(href, '_blank', WINDOW_FEATURES);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};
