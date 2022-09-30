import { Helmet } from 'react-helmet';
import { AppProperty } from '../constants/app';
import RankingSideBar from '../components/ranking/RankingSideBar';
import Rank from '../components/ranking/Rank';
import RankingMain from '../components/ranking/RankingMain';

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

            <main className="flex justify-center gap-20 px-16 py-10 scale-100">
                <div>
                    <RankingSideBar />
                </div>
                <div className="col-span-2 mb-auto">
                    <RankingMain />
                </div>
                {/* <div className="col-span-2 mb-auto">
                    <Rank />
                </div> */}
            </main>
        </>
    );
};

export default RankingPage;
