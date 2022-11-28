import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

interface Props {
    theme?: 'dark' | 'light';
    content: React.ReactNode;
    className?: string;
}

const style = {
    tooltip:
        'absolute top-[140%] left-[50%] -translate-x-[50%] px-2 py-2 rounded-md shadow-md hover:shadow-lg brightness-110 border transition-shadow',
    tooltipLight: 'bg-white border-gray-300',
    tooltipDark: 'bg-gray-700/[95] border-gray-800 text-gray-50',
    exitIcon: 'absolute top-[0.6rem] right-[0.6rem] text-2xl cursor-pointer',
    exitIconLight: 'text-gray-600 hover:text-main-500',
    exitIconDark: 'text-white hover:text-main-50',
};

const InfoTooltip: FC<Props> = ({ theme, content, className = '' }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <BsFillInfoCircleFill
                onClick={() => setShowTooltip((ps) => !ps)}
                className="text-[1.15em] text-gray-500 hover:text-main-500 hover:scale-110 cursor-pointer transition-all"
            />

            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`${style.tooltip} ${
                            theme === 'dark' ? style.tooltipDark : style.tooltipLight
                        }`}
                    >
                        <IoCloseSharp
                            onClick={() => setShowTooltip(false)}
                            className={`${style.exitIcon} ${
                                theme === 'dark'
                                    ? style.exitIconDark
                                    : style.exitIconLight
                            }`}
                        />
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InfoTooltip;
