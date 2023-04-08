import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';

import { HomeImages } from '../../../assets/home-images';
import { AppProperty } from '../../../constants';
import Button from '../../ui/buttons/Button';
import JoinBenefits from './JoinBenefits';

// Layout breakpoint is lg - 1024px
// Column layout < 1024px, row layout >= 1024px;
const JoinUs: React.FC = () => {
  return (
    <section className="flex flex-col items-center gap-y-6 lg:gap-y-12 my-2 px-4 pt-14 pb-12 text-gray-600">
      <h2 className={`text-3xl text-center text-gray-500 font-semibold capitalize`}>
        Become the member of {AppProperty.APP_NAME}!
      </h2>

      {/* Join us user message section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-x-6 xl:gap-x-20 gap-y-6 lg:px-5 w-[clamp(25rem,80rem,97vw)]">
        {/* Join us image mobile */}
        <JoinUsImage className="lg:hidden mb-0 sm:mb-3 max-w-[min(35rem,95vw)]" />

        <div className="flex flex-col self-stretch">
          <div className="capitalize">
            <p className="-mb-2 lg:mb-1 text-xl font-bold text-indigo-600">
              Try {AppProperty.APP_NAME} today
            </p>
            <h3 className="hidden lg:block text-4xl font-bold text-gray-600">
              The opportunity to learn{' '}
              <span className="text-main-400/90">programming languages</span> and{' '}
              <span className="text-main-400/90">algorithms</span> with others
            </h3>
          </div>

          <JoinBenefits />

          <Link href={'/register'} className="mt-auto lg:mb-2">
            <Button className="w-full lg:w-fit px-5 flex-center gap-3 rounded text-white">
              Sign Up For Free
              <BsArrowRight className="link-icon text-[1.2em]" />
            </Button>
          </Link>
        </div>

        {/* Join us image desktop */}
        <JoinUsImage className="hidden lg:flex" />
      </div>
    </section>
  );
};

const JoinUsImage: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`group relative flex flex-col justify-center items-center pb-2 ${className}`}
  >
    <Image src={HomeImages.JoinUs} alt="Join Us" className="w-full object-cover" />
    <p className="group mt-2 px-3 py-1 absolute top-[95%] sm:top-[97%] left-[50%] translate-x-[-50%] -translate-y-[15rem] group-hover:translate-y-0 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
      Image by{' '}
      <a
        target="_blank"
        className="group-hover:text-main-500"
        href="https://www.freepik.com/free-vector/organic-flat-join-us-concept_13818812.htm#query=hiring%20recruitment%20join%20us&position=2&from_view=keyword"
      >
        Freepik
      </a>
    </p>
  </div>
);

export default JoinUs;
