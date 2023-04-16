import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';
import RankingContainer from '../../components/ranking/container/RankingContainer';

const RankingPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>User Rankings | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Ranking page of ${AppProperty.APP_NAME} where users can browse their rankings in courses.`}
                />
            </Helmet>
            <RankingContainer />
        </>
    );
};

export default RankingPage;
