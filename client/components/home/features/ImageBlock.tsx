import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import useWindowSize from '../../../hooks/ui/useWindowSize';

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

// Custom image component for home page image animation
export const ImageBlock = ({
  onClick,
  className,
  variants,
  delay,
  src,
  alt,
}: ImageProps) => {
  const { width } = useWindowSize();
  return (
    <motion.div
      onClick={onClick}
      className={`image-block ${imageClass} ${className}`}
      variants={variants}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: width >= 1024 ? 1.1 : 1, transition: { duration: 0.5 } }}
      transition={{
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.6,
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
