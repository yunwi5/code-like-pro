import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'instant' as any });
  }, [pathname]);

  return null;
}
