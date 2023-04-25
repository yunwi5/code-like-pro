import React, { FC, useEffect, useRef, useState } from 'react';
import { BsFillClipboard2CheckFill, BsFillClipboard2Fill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

type CopyClipboardButtonProps = {
  onCopy: () => void;
  className?: string;
};

const COPY_EFFECT_DURATION = 1500;

const CopyClipboardButton: FC<CopyClipboardButtonProps> = ({ onCopy, className }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showCopiedEffect, setShowCopiedEffect] = useState(false);

  const handleCopyAction = () => {
    if (showCopiedEffect) return;

    setShowCopiedEffect(true);
    onCopy();
  };

  useEffect(() => {
    if (!showCopiedEffect) return;

    timerRef.current = setTimeout(() => {
      setShowCopiedEffect(false);
    }, COPY_EFFECT_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showCopiedEffect]);

  return (
    <div
      className={`absolute top-3 right-3 w-[50px] flex items-center flex-col gap-2 ${className}`}
    >
      <div
        onClick={handleCopyAction}
        className="flex-center p-2 text-xl bg-gray-200 hover:bg-gray-300 text-gray-600 shadow rounded cursor-pointer"
      >
        {showCopiedEffect ? <BsFillClipboard2CheckFill /> : <BsFillClipboard2Fill />}
      </div>
      <AnimatePresence>
        {showCopiedEffect && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-2 py-1 text-sm bg-gray-700 text-white shadow rounded"
          >
            Copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyClipboardButton;
