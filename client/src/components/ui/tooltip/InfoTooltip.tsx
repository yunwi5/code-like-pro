import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

interface Props {
    content: React.ReactNode;
    className?: string;
}

const InfoTooltip: FC<Props> = ({ content, className = '' }) => {
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
                        className="absolute top-[140%] left-[50%] -translate-x-[50%] px-2 py-2 rounded-md shadow-md hover:shadow-lg brightness-110 bg-white border border-gray-300 transition-shadow"
                    >
                        <IoCloseSharp
                            onClick={() => setShowTooltip(false)}
                            className="absolute top-[0.6rem] right-[0.6rem] text-gray-600 text-2xl hover:text-main-500 cursor-pointer"
                        />
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InfoTooltip;
