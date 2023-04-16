import React, { FC } from 'react';

type Props = { onCancel: () => void; className?: string };

const CancelButton: FC<Props> = ({ onCancel, className = '' }) => (
  <button
    type="button"
    onClick={onCancel}
    className={`btn btn-small border-2 border-gray-500 hover:bg-gray-500 hover:text-white ${className}`}
  >
    Cancel
  </button>
);

export default CancelButton;
