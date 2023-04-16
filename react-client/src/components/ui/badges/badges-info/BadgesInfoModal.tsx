import React from 'react';
import { GiTrophy } from 'react-icons/gi';
import { HiChartBar } from 'react-icons/hi';
import { ImFire } from 'react-icons/im';

import AnimationModal from '../../modals/AnimationModal';
import BadgeSpecs from '../badge-specs/BadgeSpecs';

interface Props {
    open: boolean;
    onClose: () => void;
}

const BadgesInfoModal: React.FC<Props> = ({ open, onClose }) => {
    return (
        <AnimationModal
            open={open}
            onClose={onClose}
            direction="vertical"
            className="!rounded-md w-[clamp(20rem,50rem,95vw)] overflow-hidden"
        >
            <section className="flex flex-col text-gray-700">
                <header className="px-7 py-4 shadow-md border-b-2 border-main-500">
                    <h2 className="text-2xl flex-start gap-2">
                        <GiTrophy className="text-main-400 text-3xl" />
                        About <span className="hidden sm:inline">Programming</span> Badges
                    </h2>
                </header>
                <div className="flex flex-col gap-2 text-slate-700 bg-slate-100">
                    <div className="px-7 py-6 max-h-[34rem] overflow-y-scroll">
                        {/* Badge motivation paragraph */}
                        <div className="flex flex-col gap-1 mb-5">
                            <h3 className="flex-start gap-1 text-xl">
                                <ImFire className="text-main-500 text-[1.2em]" />
                                Motives
                            </h3>
                            <p>
                                We offer badges in four rarity levels, and we give the
                                badges to reward your participation in our programming
                                activities such as creatign exercises, solving exercises
                                and showcasing solutions.
                            </p>
                        </div>

                        {/* Badge specs grid re-used */}
                        <div>
                            <h3 className="flex-start gap-1 mb-1 text-xl">
                                <HiChartBar className="text-main-500 text-[1.2em]" />
                                Badge Levels
                            </h3>
                            <BadgeSpecs />
                        </div>
                    </div>

                    {/* Action buttons for closing modal */}
                    <div className="flex justify-end pt-2 pb-4 px-7">
                        <button
                            type="button"
                            className="px-3 py-2 text-lg rounded-sm bg-white hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </section>
        </AnimationModal>
    );
};

export default BadgesInfoModal;
