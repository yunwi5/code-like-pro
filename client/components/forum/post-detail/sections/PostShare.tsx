import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { BsShare } from 'react-icons/bs';
import { AppProperty } from '../../../../constants/app';
import { IForumPostPopulated } from '../../../../models/interfaces';
import { getForumPostLink } from '../../../../utils/links.util';
import HoveringLabel from '../../../ui/tooltip/HoveringLabel';
import SocialPanel from '../../../ui/social/SocialPanel';

interface Props {
  post: IForumPostPopulated;
  className?: string;
}

const PostShare: React.FC<Props> = ({ post, className = '' }) => {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const shareUrl = `${window.location.hostname}${getForumPostLink(post)}`;

  return (
    <div className={`flex-center relative ${className}`}>
      <HoveringLabel label="Share!" className="">
        <button onClick={() => setShowPanel((ps) => !ps)}>
          <div
            className={`px-2 py-2 bg-slate-200 hover:text-slate-50 hover:bg-slate-500 rounded shadow hover:shadow-md transition-all`}
          >
            <BsShare className="m-1 mr-2" />
          </div>
        </button>
      </HoveringLabel>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 0, x: -135 }}
            animate={{ opacity: 1, y: -35, x: -135 }}
            exit={{ opacity: 0, y: 0, x: -135 }}
          >
            <SocialPanel
              onClose={() => setShowPanel(false)}
              url={shareUrl}
              className="bottom-[120%]"
              title={`${post.name} - CodeLikePro`}
              tags={[...(post.tags || []), 'Showcase']}
              source={post.content}
              via={AppProperty.APP_NAME}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostShare;
