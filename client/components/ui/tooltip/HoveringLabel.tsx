import React from 'react';

import './HoveringLabel.scss';

interface Props {
  label: string | JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  tooltipClassName?: string;
  children: React.ReactNode;
}

const HoveringLabel: React.FC<Props> = ({
  children,
  label,
  onClick,
  className = '',
  tooltipClassName = '',
}) => {
  return (
    <div className={`relative cursor-pointer hover-label ${className}`} onClick={onClick}>
      {children}
      <div
        className={`px-2 py-2 bg-gray-600/90 text-gray-50 hover-label__panel ${tooltipClassName}`}
      >
        <div className="hover-label__text">{label}</div>
      </div>
    </div>
  );
};

export default HoveringLabel;
