import CreationHeader from './header/CreationHeader';
import CreationSidebar from './navigation/CreationSidebar';
import ChallengeActions from './sections/ChallengeActions';
import ChallengeName from './sections/ChallengeName';
import ChallengePrompt from './sections/ChallengePrompt';
import ChallengeSettings from './sections/ChallengeSettings';
import ChallengeSolution from './sections/ChallengeSolution';
import ChallengeTemplate from './sections/ChallengeTemplate';
import ChallengeTestCases from './sections/ChallengeTestCases';

const ExerciseCreationMain = () => {
    return (
        <main className="flex justify-around px-5 xl:px-10 py-10 text-gray-700">
            <div className="xl:max-w-[70vw] flex-1 flex flex-col gap-12">
                <CreationHeader />
                <ChallengeName />
                <ChallengeSettings />
                <ChallengePrompt />
                <ChallengeSolution />
                {/* Component for rendering user starting template code */}
                <ChallengeTemplate />
                <ChallengeTestCases />
                {/* Component for buttons like 'Run Code', 'Save Changes' etc. */}
                <ChallengeActions />
            </div>
            <CreationSidebar />
        </main>
    );
};

export default ExerciseCreationMain;
