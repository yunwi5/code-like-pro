import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast notification on the right top of the web page. Message with different status type can be displayed.
type MessageType = 'success' | 'error' | 'warning' | 'info';
export const toastNotify = (message: string | JSX.Element, type?: MessageType) => {
  // add toastId to prevent multiple rendering
  if (type) {
    toast[type](message, {
      toastId: 'toast1',
      theme: 'dark',
      position: toast.POSITION.TOP_CENTER,
      className: '!bg-gray-700/90', // bg color can change.
      autoClose: 3000, // Close after 5s by default
    });
  } else {
    toast(message, {
      toastId: 'toast2',
      theme: 'dark',
      position: toast.POSITION.TOP_CENTER,
      className: '!bg-gray-700/90', // bg color can change.
      autoClose: 3000,
    });
  }
};

interface ToastProps {
  message: string | React.ReactNode;
  toastId?: string;
  type?: MessageType;
  autoClose: number;
  position?: ToastPosition;
  className?: string;
}
// Toast notification with more configs and customizations.
export const customToastNotify = (props: ToastProps) => {
  const {
    message,
    toastId = 'toast1',
    type,
    autoClose = 3000,
    position = toast.POSITION.TOP_CENTER,
    className = '',
  } = props;

  // add toastId to prevent multiple rendering
  if (type) {
    toast[type](message, {
      toastId,
      theme: 'dark',
      className: `!bg-gray-700/90 ${className}`, // bg color can change.
      autoClose,
      position,
    });
  } else {
    toast(message, {
      toastId,
      theme: 'dark',
      className: `!bg-gray-700/90 ${className}`, // bg color can change.
      autoClose,
      position,
    });
  }
};
