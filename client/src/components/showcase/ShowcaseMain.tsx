import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShowCaseSection } from '../../models/enums';
import { parseQueryString } from '../../utils/string-utils/query';
import ShowcaseDiscussions from './discussions/ShowcaseDiscussions';
import ShowcasePostModal from './modal/ShowcasePostModal';
import ShowcaseModelAnswer from './model-answer/ShowcaseModelAnswer';
import ShowcaseHeader from './ShowcaseHeader';
import ShowcaseNav from './ShowcaseNav';

const ShowcaseMain: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const section = parseQueryString<ShowCaseSection | null>(searchParams.get('section'));
    const [activeSection, setActiveSection] = useState(
        section ?? ShowCaseSection.MODEL_ANSWER,
    );
    const [showPostModal, setShowPostModal] = useState(false);

    // If the section query string changes, change the active section according to that.
    useEffect(() => {
        if (section) setActiveSection(parseQueryString(section) as any);
    }, [section]);

    // If the active section changes, change the section query string as well.
    useEffect(() => {
        setSearchParams({ section: activeSection });
    }, [activeSection]);

    return (
        <div className="flex flex-col gap-5 w-[95vw] lg:w-[92vw] xl:w-[85vw] max-w-[80rem] text-gray-700">
            {/* Showcase header displaying exercise information and two action buttons. */}
            <ShowcaseHeader />

            {/* Showcase nav controlling active section. Display a button for posting user showcase. */}
            <ShowcaseNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                setShowPostModal={setShowPostModal}
            />

            {/* Showcase page main content */}
            <main className="min-h-[max(60vh,35rem)] px-3 lg:px-6 xl:px-8 py-5 bg-slate-100 shadow-md rounded">
                {/* Render three different sections based on selected section by the user (on the navbar). */}
                {activeSection === ShowCaseSection.MODEL_ANSWER && <ShowcaseModelAnswer />}
                {activeSection === ShowCaseSection.DISCUSSIONS && <ShowcaseDiscussions />}
            </main>

            {showPostModal && <ShowcasePostModal onClose={() => setShowPostModal(false)} />}
        </div>
    );
};

export default ShowcaseMain;
