import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

type AnimationDirection = 'vertical' | 'horizontal';

/* Modal Overlay */
interface OverlayProps {
  className?: string;
  direction: AnimationDirection;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<OverlayProps> = (props) => {
  const { direction, className, children } = props;
  const isHorizontal = direction === 'horizontal';

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isHorizontal ? -200 : 0,
        y: !isHorizontal ? -150 : 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.6,
          type: 'spring',
          damping: 25,
          stiffness: 250,
        },
      }}
      exit={{
        opacity: 0,
        x: isHorizontal ? 200 : 0,
        y: !isHorizontal ? 150 : 0,
        transition: { duration: 0.2 },
      }}
      // drag
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      className={`z-[150] bg-white shadow rounded-md ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Custom backdrop for animation.
type BackdropProps = { onClose: () => void; children: React.ReactNode };
const Backdrop: React.FC<BackdropProps> = ({ onClose, children }) => (
  <div
    className={`flex-center fixed top-0 left-0 w-full h-[100vh] z-[105] bg-black/50 transition-all`}
    onClick={onClose}
  >
    {children}
  </div>
);

/* Modal */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  direction?: AnimationDirection;
  className?: string;
}

const AnimationModal: React.FC<ModalProps> = (props) => {
  const { open, direction = 'horizontal', onClose, className, children } = props;
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchedElement = document.getElementById('modal') as HTMLElement;
    setPortalElement(fetchedElement);
  }, []);

  if (portalElement === null) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {open && (
            <Backdrop onClose={onClose}>
              <ModalOverlay direction={direction} className={className}>
                {children}
              </ModalOverlay>
            </Backdrop>
          )}
        </AnimatePresence>,
        portalElement,
      )}
    </>
  );
};

export default AnimationModal;
