import React from 'react';

interface Error404Props {
  message?: string;
  homePath?: string;
}

const Error404: React.FC<Error404Props> = ({ message = 'Page Not Found', homePath = '/' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-24 h-24 text-red-500"
        >
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <div className="text-6xl font-bold">404</div>
        <div className="text-2xl">{message}</div>
        <a href={homePath} className="mt-4 text-xl text-blue-600 hover:text-blue-800">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default Error404;
