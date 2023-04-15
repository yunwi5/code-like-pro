import React from 'react';

import Error404 from '@/components/utils/Error404';
import { getGlobalRankigLink } from '@/utils/links.util';

function NotFound() {
  return (
    <Error404
      additionalLink={{
        href: getGlobalRankigLink(),
        text: 'Global Rankings',
      }}
    />
  );
}

export default NotFound;
