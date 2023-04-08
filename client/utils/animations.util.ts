export const listItemAnimations = {
  initial: { opacity: 0.1, x: 300 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300, transition: { duration: 0.3 } },
};

// children are staggering up to its place
export const upwardStaggeringAnimations = {
  initial: {
    opacity: 0.3,
    scale: 0.75,
    translateX: 100,
    translateY: 300,
    boxShadow: '30px 30px 30px rgba(0, 0, 0, 0.3)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
    transitionEnd: { boxShadow: 'none' },
  },
};
