import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import AnimationModal from '../AnimationModal';

interface Props {
  open: boolean;
  onClose(): void;
  heading: JSX.Element | string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  buttonText?: string;
}

const FormModal: React.FC<Props> = (props) => {
  const {
    open,
    heading,
    onClose,
    children,
    onSubmit,
    isLoading = false,
    buttonText,
  } = props;

  return (
    <AnimationModal
      open={open}
      onClose={onClose}
      className="!rounded-md min-w-[min(37.5rem,92.5vw)] overflow-hidden"
    >
      <div className="text-gray-700">
        {/* Modal header */}
        <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
          <h2 className="text-2xl flex-start gap-2">{heading}</h2>
        </header>

        {/* Modal form body */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 bg-slate-200/90 px-7 py-5"
        >
          {children}

          {/* Action buttons for submission and closing modal */}
          <div className="pt-2 flex-between">
            {isLoading && <ClipLoader color="#3c38e0" size={40} />}
            {!isLoading && (
              <>
                <button
                  className={
                    'px-3 py-2 text-lg rounded-sm bg-gray-700 hover:bg-gray-800 text-white shadow-md'
                  }
                >
                  {buttonText ?? 'Submit'}
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
        </form>
      </div>
    </AnimationModal>
  );
};

export default FormModal;
