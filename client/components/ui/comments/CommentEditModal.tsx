import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { IComment } from '../../../models/interfaces';
import AnimationModal from '../modals/AnimationModal';
import CommentForm from './CommentForm';

interface Props {
  open: boolean;
  onUpdate: (id: string, updateProp: { text: string }) => Promise<void> | void;
  onClose: () => void;
  comment: IComment;
}

const CommentEditModal: React.FC<Props> = ({ open, onUpdate, onClose, comment }) => {
  const handleEdit = async (text: string) => {
    await onUpdate(comment._id, { text });
    onClose();
  };

  return (
    <AnimationModal
      open={open}
      direction="vertical"
      onClose={onClose}
      className="!rounded-md min-w-[min(37.5rem,92.5vw)] overflow-hidden"
    >
      <div className="text-gray-700">
        {/* Modal header */}
        <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
          <h2 className="text-2xl flex-start gap-2">
            <RiEditBoxLine className="text-main-400 text-3xl" /> Edit Your Comment!
          </h2>
        </header>

        <div className="flex flex-col gap-5 bg-slate-200/90 px-7 pt-10 pb-7">
          {/* Modal form body */}
          <CommentForm
            onSubmit={handleEdit}
            onCancel={onClose}
            inputType="textarea"
            defaultComment={comment}
          />
        </div>
      </div>
    </AnimationModal>
  );
};

export default CommentEditModal;
