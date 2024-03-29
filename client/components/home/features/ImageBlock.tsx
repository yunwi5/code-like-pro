'use client';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

const imageClass =
  'relative lg:absolute overflow-hidden rounded-sm border-[1.5px] border-gray-300 shadow hover:!opacity-100 hover:z-20';

interface ImageProps {
  variants: any;
  className: string;
  src: StaticImageData;
  alt: string;
  onClick?: () => void;
  delay?: number;
}

export const ImageBlock = ({ onClick, className, variants, delay, src, alt }: ImageProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`image-block ${imageClass} ${className}`}
      variants={variants}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.15, transition: { duration: 0.5 } }}
      transition={{
        ease: 'easeIn',
        delay,
      }}
      viewport={{ once: true }}
      exit="exit"
    >
      <Image src={src} alt={alt} className="object-cover w-full h-full" />
      <button className="image-btn absolute top-[50%] left-[50%] px-3 py-2 rounded-full bg-gray-500 hover:bg-main-500 text-white capitalize">
        {alt || 'Image'}
      </button>
    </motion.div>
  );
};

export default ImageBlock;
