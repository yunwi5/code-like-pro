import React from 'react';

import Error404 from '@/components/utils/error/Error404';
import { getGlobalRankigLink } from '@/utils/links.util';

function NotFound() {
  return (
    <Error404
      message="Topic Not Found"
      additionalLink={{
        href: getGlobalRankigLink(),
        text: 'Global Rankings',
      }}
    />
  );
}

export default NotFound;
