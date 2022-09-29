import { Helmet } from 'react-helmet';
import { AppProperty } from '../constants/app';
import RankingSideBar from '../components/ranking/RankingSideBar';
import Rank from '../components/ranking/Rank';

const RankingPage: React.FC = () => {
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
                <div className="ml-auto">
                    <RankingSideBar />
                </div>
                <div className="col-span-2 mb-auto">
                    <Rank />
                </div>
            </main>
        </>
    );
};

export default RankingPage;
