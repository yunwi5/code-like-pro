import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import './BadgeLink.scss';

const BadgeLink: React.FC = () => {
  return (
    <Link
      href="/profile#badges"
      className="badge-link mt-auto lg:mb-10 btn btn-large bg-slate-100 shadow-md hover:shadow-lg"
    >
      <span className="link-content flex-center gap-2">
        Check Your Badges{' '}
        <BsArrowRight className="link-icon text-main-500 text-[1.2em]" />
      </span>
    </Link>
  );
};

export default BadgeLink;
