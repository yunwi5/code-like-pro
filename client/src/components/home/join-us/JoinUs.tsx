import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineCheck } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HomeImages } from '../../../assets/home-images';
import { AppProperty } from '../../../constants/app';
import Button from '../../ui/buttons/Button';

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
                <JoinUsImage className="lg:hidden max-w-[35rem]" />

                <div className="flex flex-col self-stretch">
                    <div className="capitalize">
                        <h5 className="mb-1 text-xl font-bold text-indigo-600">
                            Try {AppProperty.APP_NAME} today
                        </h5>
                        <h3 className="hidden lg:block text-4xl font-bold text-gray-600">
                            The opportunity to learn{' '}
                            <span className="text-main-400/90">
                                programming languages
                            </span>{' '}
                            and <span className="text-main-400/90">algorithms</span> with
                            others
                        </h3>
                    </div>

                    <ul className="max-w-[35rem] lg:max-w-none my-5 flex flex-col gap-2">
                        {joinUsFeatures.map((feature, idx) => (
                            <li key={idx} className="flex">
                                <MdOutlineCheck className="inline-block mr-1 text-emerald-500 text-2xl" />
                                <span className="font-semibold">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to={'/register'} className="mt-auto">
                        <Button className="w-full lg:w-fit px-5 flex-center gap-3 rounded text-white">
                            Sign Up For Free
                            <BsArrowRight className="link-icon text-[1.2em]" />
                        </Button>
                    </Link>
                </div>

                {/* Join us image desktop */}
                <JoinUsImage className="hidden lg:block" />
            </div>
        </section>
    );
};

const JoinUsImage: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={className}>
        <img className="w-full object-cover" src={HomeImages.JoinUs} alt="Join Us" />
    </div>
);

const joinUsFeatures = [
    'Unlimited capability to create new programming exercises.',
    'Unlimited access to programming challenges created by others for you to solve.',
    'Customized profile customization and comprehensive progress analytics entirely with no extra costs.',
];

export default JoinUs;
