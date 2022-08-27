import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '../../models/enums';

export const toastNotify = (message: string, type?: ToastType) => {
    // add toastId to prevent multiple rendering
    type
        ? toast[type](message, {
              toastId: 'toast1',
              theme: 'dark',
              className: '!bg-gray-600', // bg color can change.
          })
        : toast(message, {
              toastId: 'toast2',
          });
};
