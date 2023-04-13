import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  mode?: 'fill' | 'empty';
  size?: 'small' | 'medium' | 'large';
  theme?: 'main' | 'indigo' | 'purple' | 'pink';
}

// Re-usable button component for our app theme.
// btn class and btn-fill & btn-empty classes are defined in the index.scss file.
const Button: React.FC<Props> = (props) => {
  const {
    className,
    children,
    onClick,
    type,
    mode = 'fill',
    size = 'medium',
    theme = 'main',
  } = props;
  const modeClass = mode === 'fill' ? 'btn-fill' : 'btn-empty';
  const sizeClass = size === 'small' ? 'btn-small' : size === 'large' ? 'btn-large' : '';

  return (
    <button
      type={type}
      className={`btn ${modeClass} ${sizeClass} ${theme} ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
