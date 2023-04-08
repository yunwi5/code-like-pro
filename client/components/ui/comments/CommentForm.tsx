import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { IComment } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import Button from '../buttons/Button';
import CancelButton from '../buttons/CancelButton';
import ProfilePicture from '../user/ProfilePicture';

interface Props {
  defaultComment?: IComment;
  inputType?: 'input' | 'textarea';
  className?: string;
  onSubmit: (text: string) => Promise<void>;
  onCancel?: () => void;
}

const CommentForm: React.FC<Props> = (props) => {
  const {
    onSubmit,
    inputType = 'input',
    className = '',
    defaultComment,
    onCancel,
  } = props;

  const router = useRouter();
  const { userDetail } = useUserContext();
  const [text, setText] = useState(defaultComment?.text || '');
  // Check whether the comment form is valid. If it is false, do not allow users to submit.
  // Form is valid only if the comment text is not an empty string.
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    if (!userDetail?._id) return router.push('/login');

    setIsLoading(true);
    await onSubmit(text);
    setText('');
    setIsLoading(false);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setText(e.target.value);

  // Cancel adding comment. Call onCancel() callback which is called when the cancel action is triggered.
  const handleCancel = () => {
    setText('');
    onCancel && onCancel();
  };

  useEffect(() => {
    // Whenever form text changes, re-validates whether the form is valid or not.
    // Form is valid only if there is a non-empty text.
    setFormValid(text.trim() === '' ? false : true);
  }, [text]);

  // Re-usable input props for both 'input' and 'textarea' mode
  const inputProps = {
    value: text,
    placeholder: 'Add your comment...',
    onChange: handleTextChange,
    className:
      'w-full px-2 py-2 bg-gray-100/90 shadow focus:shadow-md focus:outline-none focus:bg-white',
  };

  return (
    <form className={`flex gap-3 ${className}`} onSubmit={handleSubmit}>
      <ProfilePicture
        picture={userDetail?.pictureUrl}
        alt={userDetail?.name || 'User profile'}
      />
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <div className="relative border-b-[3px] border-gray-300 input-underline-effect">
            {inputType === 'input' ? (
              <input {...inputProps} />
            ) : (
              <textarea {...inputProps} rows={3} />
            )}
            <AiOutlineComment
              className={`${commentIconClass} ${
                inputType === 'textarea' ? '!top-4' : ''
              }`}
            />
          </div>
        </div>
        {formValid && (
          <div className="w-full flex justify-end gap-1">
            {isLoading ? (
              <ClipLoader color="#3c38e0" size={30} />
            ) : (
              <>
                <CancelButton onCancel={handleCancel} />
                <Button type="submit" className="" size="small">
                  Comment!
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

const commentIconClass =
  'text-[1.3rem] text-gray-500/90 absolute top-[50%] right-2 -translate-y-[50%]';

export default CommentForm;
