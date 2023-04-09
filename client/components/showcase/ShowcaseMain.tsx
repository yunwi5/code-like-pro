import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ShowCaseSection } from '../../models/enums';
import { parseUrlString } from '../../utils/string-utils/url.util';
import ShowcaseDiscussions from './discussions/ShowcaseDiscussions';
import ShowcasePostModal from './modal/ShowcasePostModal';
import ShowcaseModelAnswer from './model-answer/ShowcaseModelAnswer';
import ShowcaseHeader from './ShowcaseHeader';
import ShowcaseNav from './ShowcaseNav';
import ShowcaseShowcases from './showcases/ShowcaseShowcases';

const ShowcaseMain: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = parseUrlString(searchParams.get('section')) as ShowCaseSection;
  const [activeSection, setActiveSection] = useState<ShowCaseSection>(
    section ?? ShowCaseSection.MODEL_ANSWER,
  );
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('section', activeSection);
    window.history.pushState({}, '', `${pathname}?${newSearchParams.toString()}`);
  }, [activeSection, pathname, searchParams]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const oldSection = parseUrlString(params.get('section')) as ShowCaseSection;
      setActiveSection(oldSection);
    };
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-[95vw] lg:w-[92vw] xl:w-[85vw] max-w-[80rem] text-gray-700">
      <ShowcaseHeader />

      <ShowcaseNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setShowPostModal={setShowPostModal}
      />

      <main className="min-h-[max(60vh,35rem)] flex flex-col px-1 sm:px-3 lg:px-6 xl:px-8 py-5 bg-slate-100 shadow-md rounded">
        {activeSection === ShowCaseSection.MODEL_ANSWER && <ShowcaseModelAnswer />}
        {activeSection === ShowCaseSection.DISCUSSIONS && <ShowcaseDiscussions />}
        {activeSection === ShowCaseSection.SHOWCASES && <ShowcaseShowcases />}
      </main>

      <ShowcasePostModal
        visible={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </div>
  );
};

export default ShowcaseMain;
