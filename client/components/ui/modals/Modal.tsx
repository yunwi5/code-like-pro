import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import classes from './Modal.module.scss';

/* Modal Overlay */
interface OverlayProps {
  className?: string;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<OverlayProps> = (props) => {
  return <div className={`${classes.modal} ${props.className}`}>{props.children}</div>;
};

/* Modal */
interface ModalProps {
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const portalElement = document.getElementById('modal') as HTMLElement;

  return (
    <>
      <Backdrop onClose={props.onClose} />,
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
