import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast notification on the right top of the web page. Message with different status type can be displayed.
type MessageType = 'success' | 'error' | 'warning' | 'info';
export const toastNotify = (message: string, type?: MessageType) => {
    // add toastId to prevent multiple rendering
    if (type) {
        toast[type](message, {
            toastId: 'toast1',
            theme: 'dark',
            position: toast.POSITION.TOP_CENTER,
            className: '!bg-gray-700/90', // bg color can change.
        });
    } else {
        toast(message, {
            toastId: 'toast2',
            theme: 'dark',
            position: toast.POSITION.TOP_CENTER,
            className: '!bg-gray-700/90', // bg color can change.
        });
    }
};

interface ToastProps {
    message: string;
    toastId?: string;
    type?: MessageType;
    autoClose: number;
    position: ToastPosition;
}
// Toast notification with more configs and customizations.
export const customToastNotify = (props: ToastProps) => {
    const {
        message,
        toastId = 'toast1',
        type,
        autoClose = 5000,
        position = toast.POSITION.TOP_CENTER,
    } = props;

    // add toastId to prevent multiple rendering
    if (type) {
        toast[type](message, {
            toastId,
            theme: 'dark',
            className: '!bg-gray-700/80', // bg color can change.
            autoClose,
            position,
        });
    } else {
        toast(message, {
            toastId,
            theme: 'dark',
            className: '!bg-gray-700/80', // bg color can change.
            autoClose,
            position,
        });
    }
};
