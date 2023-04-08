import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
} from 'react-share';
import LinkedinShareButton from 'react-share/lib/LinkedinShareButton';

interface Props {
  onClose(): void;
  className?: string;
  url?: string;
  title?: string;
  source?: string;
  tags?: string[];
  via?: string;
}

const DEFAULT_URL = 'https://code-like-pro.vercel.app/';

const SocialPanel: React.FC<Props> = (props) => {
  const {
    onClose,
    className = '',
    url = DEFAULT_URL,
    title = 'Share my programming work!',
    source,
    tags,
    via,
  } = props;

  // Facebook tag (only allow a single tag)
  const tagsString = tags && tags.length > 0 ? `#${tags[0]}` : '#Programming';

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div
        className={`absolute z-100 flex-center gap-2 px-2 py-1 bg-white border-2 border-slate-200 shadow hover:shadow-md transition-all rounded ${className}`}
      >
        <FacebookShareButton
          url={url}
          quote={title}
          hashtag={tagsString}
          className={btnClass}
        >
          <FacebookIcon size={35} round /> <span className="text-[0.8em]">Facebook</span>
        </FacebookShareButton>

        <TwitterShareButton
          url={url}
          via={via}
          title={'test'}
          hashtags={tags}
          className={btnClass}
        >
          <TwitterIcon size={35} round />
          <span className="text-[0.8em]">Twitter</span>
        </TwitterShareButton>

        <LinkedinShareButton
          url={url}
          title={title}
          // summary="Summary"
          source={source}
          className={btnClass}
        >
          <LinkedinIcon size={35} round />
          <span className="text-[0.8em]">LinkedIn</span>
        </LinkedinShareButton>
      </div>
    </ClickAwayListener>
  );
};

const btnClass = 'flex-center flex-col hover:!bg-slate-100 !px-2 !py-1';

export default SocialPanel;
