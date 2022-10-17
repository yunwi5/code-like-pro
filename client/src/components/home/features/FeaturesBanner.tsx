import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProperty } from '../../../constants/app';

const banner = {
    animte: { transition: { staggerChildren: 0.2 } },
};

const messages = [
    { text: 'Creative problem designer', color: 'text-main-400' },
    { text: 'Powerful Programmer', color: 'text-violet-500' },
    { text: 'Best problem solver', color: 'text-purple-500' },
    { text: 'Strong program tester', color: 'text-pink-500' },
];

const MESSAGE_INTERVAL = 5000;

const FeaturesBanner: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    // Change message to be displayed every 4.5s with intervals
    useEffect(() => {
        let interval = setInterval(() => {
            setMessageIndex((msgIndex) => {
                const nextIndex = (msgIndex + 1) % messages.length;
                return nextIndex;
            });
        }, MESSAGE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="flex flex-col md:flex-row items-start md:items-center gap-3 pl-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-500 whitespace-nowrap font-semibold">
            <p>Become The</p>
            <div className="px-3 py-2 max-h-[59px] w-fit transition-all border-2 border-slate-400 rounded-2xl text-main-400 font-bold shadow">
                <AnimatePresence>
                    {messages.map((message, idx) =>
                        messageIndex === idx ? (
                            <AnimatedLetters
                                key={message.text}
                                letters={message.text}
                                className={message.color}
                            />
                        ) : null,
                    )}
                </AnimatePresence>
            </div>
            <p>With {AppProperty.APP_NAME}</p>
        </h1>
    );
};

const AnimatedLetters = ({
    letters,
    className,
}: {
    letters: string;
    className: string;
}) => {
    return (
        <motion.div
            className={`relative tracking-wide capitalize ${className}`}
            variants={banner}
            initial="initial"
            exit={{
                translateY: -100,
                opacity: 0,
                transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.5 },
            }}
        >
            {[...letters].map((letter, idx) => (
                <motion.span
                    key={idx}
                    className="relative inline-block"
                    initial={{ y: 400, opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            ease: [0.6, 0.01, -0.05, 0.95],
                            duration: 1,
                            delay: idx * 0.1,
                        },
                    }}
                    viewport={{ once: true }}
                >
                    {letter === ' ' ? <>&nbsp;</> : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default FeaturesBanner;
