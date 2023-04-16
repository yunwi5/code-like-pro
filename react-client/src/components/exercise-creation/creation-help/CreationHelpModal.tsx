import React, { useState } from 'react';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Language } from '../../../models/enums';
import AnimationModal from '../../ui/modals/AnimationModal';
import CHelp from './languages-help/CHelp';
import CppHelp from './languages-help/CppHelp';
import JavaHelp from './languages-help/JavaHelp';
import JavaScriptHelp from './languages-help/JavaScriptHelp';
import PythonHelp from './languages-help/PythonHelp';
import LanguageMenu from './sections/LanguageMenu';

interface Props {
    open: boolean;
    onClose: () => void;
    defaultLanguage?: Language;
}

const CreationHelpModal: React.FC<Props> = ({ open, onClose, defaultLanguage }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        defaultLanguage ?? Language.PYTHON,
    );

    return (
        <AnimationModal
            open={open}
            onClose={onClose}
            direction="vertical"
            className="!rounded-md w-[clamp(20rem,55rem,97vw)] overflow-hidden"
        >
            <section className="flex flex-col text-gray-700">
                <header className="px-7 py-4 shadow-md border-b-2 border-main-400">
                    <h2 className="text-xl sm:text-2xl flex-start gap-2 capitalize">
                        <BsInfoSquareFill className="text-main-400 text-[1.2em]" />
                        Help for exercise creation
                    </h2>
                </header>
                <div className="flex flex-col gap-3 py-3 text-slate-700 bg-slate-100">
                    <LanguageMenu
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        className="px-3 lg:px-7 pt-1"
                    />

                    {/* Language specific documentation */}
                    <div
                        id="modal-scroll"
                        className="mt-1 px-3 lg:px-7 max-h-[30rem] overflow-y-scroll text-sm sm:text-base"
                    >
                        {getLanguageHelp(selectedLanguage)}
                    </div>

                    {/* Action buttons for moving to showcase page or closing modal */}
                    <div className="flex-end px-3 lg:px-7">
                        <button
                            type="button"
                            className="px-3 py-2 text-lg rounded-sm bg-white hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </section>
        </AnimationModal>
    );
};

// Language help documentation for each language supported
function getLanguageHelp(language: Language) {
    switch (language) {
        case Language.C:
            return <CHelp />;
        case Language.CPP:
            return <CppHelp />;
        case Language.JAVA:
            return <JavaHelp />;
        case Language.PYTHON:
            return <PythonHelp />;
        case Language.JAVASCRIPT:
            return <JavaScriptHelp />;
        default:
            return <PythonHelp />;
    }
}

export default CreationHelpModal;
