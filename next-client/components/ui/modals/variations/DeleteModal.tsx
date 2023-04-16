import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ClipLoader } from 'react-spinners';

import AnimationModal from '../AnimationModal';

interface Props {
  open: boolean;
  // Callback function to trigger closing of the modal
  onClose: () => void;
  // Callback function for hanlding the delete request
  deleteFunction: () => Promise<any>;
  // Callback function to be called when the delete request is completed.
  onDelete?: () => void;
  // name of the item to delete
  item: string | JSX.Element;
}

// Modal for handling delete action and request
const DeleteModal: React.FC<Props> = ({ open, onClose, deleteFunction, onDelete, item }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteFunction();
    setIsLoading(false);

    onDelete && onDelete();
    onClose();
  };

  return (
    <AnimationModal
      open={open}
      direction="vertical"
      onClose={onClose}
      className="!rounded-md //min-w-[min(25rem,92.5vw)] w-[clamp(25rem,35rem,95vw)] overflow-hidden"
    >
      {/* Delete modal header */}
      <header className="px-7 py-4 shadow-md border-b-2 border-rose-500">
        <h2 className="text-2xl flex-start gap-2 capitalize">
          <RiDeleteBin6Line className="text-rose-500 text-3xl" /> Really want to delete?
        </h2>
      </header>

      {/* Issue report body */}
      <div className="flex flex-col gap-3 px-7 pt-8 pb-5 bg-slate-200/90">
        <p className="-mt-2 font-semibold text-slate-600">
          You are about to delete <strong className="text-semibold text-rose-500">{item}</strong>.
        </p>
        <p>Your action will not be cancelled, so please be careful before delete.</p>

        {/* Action buttons for submission and closing modal */}
        <div className="pt-2 flex-between">
          {isLoading && <ClipLoader color="#fb7185" size={40} />}
          {!isLoading && (
            <>
              <button
                onClick={handleDelete}
                className={
                  'px-3 py-2 text-lg rounded-sm transition-all bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                }
              >
                Delete
              </button>
              <button
                type="button"
                className="px-3 py-2 text-lg rounded-sm bg-white hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg"
                onClick={onClose}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </AnimationModal>
  );
};

export default DeleteModal;
