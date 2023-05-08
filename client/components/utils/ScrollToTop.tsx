'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'instant' as any });
  }, [pathname]);

  return null;
}
