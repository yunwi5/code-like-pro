import { FC } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCheck } from 'react-icons/md';

const JoinBenefits: FC = () => {
    return (
        <ul className="max-w-[35rem] lg:max-w-none my-5 flex flex-col gap-2">
            {joinUsFeatures.map((feature, idx) => (
                <motion.li
                    initial={{ opacity: 0, y: 200 }}
                    viewport={{ once: true }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3, delay: 0.3 + idx * 0.1 },
                    }}
                    key={idx}
                    className="flex"
                >
                    <MdOutlineCheck className="inline-block mr-1 text-emerald-500 text-2xl" />
                    <span className="font-semibold">{feature}</span>
                </motion.li>
            ))}
        </ul>
    );
};

const joinUsFeatures = [
    'Unlimited capability to create new programming exercises.',
    'Unlimited access to programming challenges created by others for you to solve.',
    'Customized profile customization and comprehensive progress analytics entirely with no extra costs.',
];

export default JoinBenefits;
