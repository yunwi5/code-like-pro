import React, { useState } from 'react';
import ShowcasePostModal from './modal/ShowcasePostModal';
import ShowcaseModelAnswer from './model-answer/ShowcaseModelAnswer';

import ShowcaseHeader from './ShowcaseHeader';
import ShowcaseNav, { ShowcaseSection } from './ShowcaseNav';

const ShowcaseMain: React.FC = () => {
    const [activeSection, setActiveSection] = useState(ShowcaseSection.MODEL_ANSWER);
    const [showPostModal, setShowPostModal] = useState(false);

    return (
        <div className="flex flex-col gap-5 w-[95vw] lg:w-[92vw] xl:w-[85vw] max-w-[80rem] text-gray-700">
            <ShowcaseHeader />
            <ShowcaseNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                setShowPostModal={setShowPostModal}
            />
            <main className="min-h-[max(60vh,35rem)] px-3 lg:px-6 xl:px-8 py-5 bg-slate-100 shadow-md rounded">
                {activeSection === ShowcaseSection.MODEL_ANSWER && <ShowcaseModelAnswer />}
            </main>

            {showPostModal && <ShowcasePostModal onClose={() => setShowPostModal(false)} />}
        </div>
    );
};

export default ShowcaseMain;
