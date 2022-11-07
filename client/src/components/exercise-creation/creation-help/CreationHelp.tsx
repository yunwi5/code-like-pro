import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { Language } from '../../../models/enums';
import CreationHelpModal from './CreationHelpModal';

interface Props {
    open: boolean;
    setVisible: (visible: boolean) => void;
    defaultLanguage?: Language;
}

const CreationHelp: React.FC<Props> = ({ open, setVisible, defaultLanguage }) => {
    return (
        <div className="text-gray-600 text-base">
            <button
                onClick={() => setVisible(true)}
                className="flex-center gap-1 group px-3 py-[0.3rem] font-semibold rounded-full hover:bg-main-400 hover:text-white hover:shadow-md"
            >
                <FiHelpCircle className="text-main-500 group-hover:text-main-50 text-[1.3em]" />
                Help
            </button>

            <CreationHelpModal
                open={open}
                onClose={() => setVisible(false)}
                defaultLanguage={defaultLanguage}
            />
        </div>
    );
};

export default CreationHelp;
