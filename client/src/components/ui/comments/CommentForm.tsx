import React, { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { IComment } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import Button from '../buttons/Button';
import ProfilePicture from '../user/ProfilePicture';

interface Props {
    defaultComment?: IComment;
    className?: string;
    onSubmit: (text: string) => Promise<void>;
    onCancel?: () => void;
}

const CommentForm: React.FC<Props> = (props) => {
    const { onSubmit, className = '', defaultComment, onCancel } = props;

    const { userDetail } = useUserContext();
    const [text, setText] = useState(defaultComment?.text || '');
    // Check whether the comment form is valid. If it is false, do not allow users to submit.
    // Form is valid only if the comment text is not an empty string.
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formValid) return;
        setIsLoading(true);
        await onSubmit(text);
        setText('');
        setIsLoading(false);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

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

    return (
        <form className={`flex gap-3 ${className}`} onSubmit={handleSubmit}>
            <ProfilePicture picture={userDetail?.pictureUrl} />
            <div className="flex-1 flex flex-col gap-2">
                <div>
                    <div className="relative border-b-[3px] border-gray-300 input-underline-effect">
                        <input
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Add your comment..."
                            className="w-full px-2 py-2 bg-gray-100/90 shadow transition-all focus:shadow-md focus:outline-none focus:bg-white"
                        />
                        <AiOutlineComment className="text-[1.3rem] text-gray-500/90 absolute top-[50%] right-2 -translate-y-[50%]" />
                    </div>
                </div>
                {formValid && (
                    <div className="w-full flex justify-end gap-1">
                        {isLoading ? (
                            <ClipLoader color="#3c38e0" size={30} />
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-small border-2 border-gray-500 hover:bg-gray-500 hover:text-white"
                                >
                                    Cancel
                                </button>
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

export default CommentForm;
