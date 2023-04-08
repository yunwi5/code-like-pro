import { useRouter } from 'next/router';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`px-2 md:px-3 py-2 rounded-full flex gap-3 items-center md:translate-y-2 transition-all hover:bg-gray-600 hover:text-gray-50 hover:shadow-lg ${className}`}
    >
      <FiArrowLeft size="25" />
      <span className="hidden md:inline">Go Back</span>
    </button>
  );
};

export default BackButton;
