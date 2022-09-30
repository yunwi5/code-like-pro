import ReactDOM from 'react-dom';

/* BackDrop */
interface BackdropProps {
    onClose: () => void;
    className?: string;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose, className = '' }) => {
    const portalElement = document.getElementById('modal') as HTMLElement;

    const BackdropComponent = (
        <div
            className={`fixed top-0 left-0 w-full h-[100vh] z-[105] bg-black/50 transition-all ${className}`}
            onClick={onClose}
        />
    );

    return <>{ReactDOM.createPortal(BackdropComponent, portalElement)}</>;
};

export default Backdrop;
