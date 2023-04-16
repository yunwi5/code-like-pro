'use client';
import dynamic from 'next/dynamic';

import useAuth from '@/hooks/utils/useAuth';

import CreationHeader from './header/CreationHeader';
import CreationActions from './sections/CreationActions';
import CreationName from './sections/CreationName';
import CreationSettings from './sections/CreationSettings';
import CreationSolution from './sections/CreationSolution';
import CreationTemplate from './sections/CreationTemplate';
import CreationTestCases from './sections/CreationTestCases';
import CreationSidebar from './sidebar/CreationSidebar';

const CreationPrompt = dynamic(() => import('./sections/CreationPrompt'), { ssr: false });

const ExerciseCreationMain = () => {
  useAuth();

  return (
    <main className="flex justify-center lg:gap-8 xl:gap-[7.5%] mb-6 px-3 md:px-5 xl:px-10 py-10 text-gray-700">
      <div className="lg:max-w-[75vw] xl:max-w-[min(70vw,55rem)] flex-1 flex flex-col gap-12">
        <CreationHeader />
        <CreationName />
        {/* Settings for difficulty, language, topic, and tags */}
        <CreationSettings />
        <CreationPrompt />
        <CreationSolution />
        {/* Component for rendering user starting template code */}
        <CreationTemplate />
        <CreationTestCases />
        <div className="lg:hidden">
          <CreationActions />
        </div>
      </div>
      <CreationSidebar />
    </main>
  );
};

export default ExerciseCreationMain;
