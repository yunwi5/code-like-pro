/* BackDrop */
interface BackdropProps {
    onClose: () => void;
    className?: string;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose, className = '' }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-[100vh] z-[105] bg-black/50 ${className}`}
            onClick={onClose}
        />
    );
};

export default Backdrop;
