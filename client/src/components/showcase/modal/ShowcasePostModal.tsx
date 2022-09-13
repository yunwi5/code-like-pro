import React, { useState } from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { postExerciseShowCase } from '../../../apis/exercise';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import { toastNotify } from '../../../utils/notification';
import CodeEditor from '../../ui/editor/CodeEditor';
import CustomInput from '../../ui/inputs/CustomInput';
import FormModal from '../../ui/modals/variations/FormModal';

interface Props {
    onClose: () => void;
}

const ShowcasePostModal: React.FC<Props> = ({ onClose }) => {
    const { userSubmission, exercise } = useShowcase();
    const [description, setDescription] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!exercise) return;
        if (description.trim() === '') {
            return setError('Please write your short description!');
        }

        const showCaseProps = {
            code: userSubmission?.code || '',
            description,
        };

        setIsLoading(true);
        // Send Http POST request to add user showcase.
        const { ok, data, message } = await postExerciseShowCase(exercise._id, showCaseProps);
        if (ok) {
            toastNotify('Your showcase was posted!', 'success');
            console.log('new showcase:', data);
            onClose();
        } else {
            toastNotify(`Sorry there is an error: ${message}.`, 'error');
        }
        setIsLoading(false);
    };

    const handleDescription = (value: string) => {
        setDescription(value);
        if (value.trim() !== '') setError(null);
    };

    if (!exercise) return null;

    return (
        <FormModal
            onClose={onClose}
            onSubmit={handleSubmit}
            heading={
                <>
                    <FaLaptopCode className="text-main-400 text-[1.65rem]" />
                    Showcase Your Work!
                </>
            }
            isLoading={isLoading}
            buttonText="Post It"
        >
            {/* User code short description input */}
            <CustomInput
                onChange={handleDescription}
                labelText="Short Description"
                value={description}
                error={error}
                placeholder={'Tell us briefly about your algorithm...'}
            />

            {/* User submission code display */}
            <div className="flex flex-col">
                <h2 className="mb-2">Your Solution</h2>
                <CodeEditor
                    className="flex-1"
                    onChange={() => {}}
                    showHeader={false}
                    language={exercise.language}
                    value={userSubmission?.code || ''}
                    height={'15rem'}
                    readOnly={true}
                />
            </div>
        </FormModal>
    );
};

export default ShowcasePostModal;