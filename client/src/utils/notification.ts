import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast notification on the right top of the web page. Message with different status type can be displayed.
type MessateType = 'success' | 'error' | 'warning' | 'info';

export const toastNotify = (message: string, type?: MessateType) => {
    // add toastId to prevent multiple rendering
    type
        ? toast[type](message, {
              toastId: 'toast1',
              theme: 'dark',
              className: '!bg-gray-700/80', // bg color can change.
          })
        : toast(message, {
              toastId: 'toast2',
          });
};
