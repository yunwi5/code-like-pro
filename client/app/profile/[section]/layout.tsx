import React from 'react';

async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[82.5vh] pt-10 pb-20 flex-center flex-col text-gray-700">
      <div className="mx-auto w-[100vw] sm:w-[95vw] md:w-[92.5vw] lg:w-[90vw] xl:w-[85vw] 2xl:w-[min(80vw,80rem)]">
        {children}
      </div>
    </main>
  );
}

export default Layout;
