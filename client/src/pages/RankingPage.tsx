import { Helmet } from 'react-helmet';
import { AppProperty } from '../constants/app';
import useAuth from '../hooks/useAuth';
import RankingSideBar from '../components/ranking/RankingSideBar';
import Rank from '../components/ranking/Rank';
import RankingPodium from '../components/ranking/RankingPodium';

//import RankingMain from '../components/exercise-creation/ExerciseCreationMain';
//import { RankingContextProvider } from '../store/context/RankingContext';

const RankingPage: React.FC = () => {
    // Auth protector. Only authenticated user can access this page.
    useAuth();

    return (
        <>
            <Helmet>
                <title>Rankings | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Ranking page of ${AppProperty.APP_NAME} where users can browse their rankings in courses.`}
                />
            </Helmet>

            <main className="grid grid-cols-3 gap-20 p-10 scale-100">
                <div className="ml-auto"><RankingSideBar /></div>
                <div className="col-span-2 mb-auto"><Rank /></div>
            </main>

        </>
    );

}

export default RankingPage;