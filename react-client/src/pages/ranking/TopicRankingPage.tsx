import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AppProperty } from '../../constants/app';
import { ProgrammingTopic, ProgrammingTopicList } from '../../models/enums';
import { parseUrlString } from '../../utils/string-utils/url.util';
import RankingContainer from '../../components/ranking/container/RankingContainer';

export function useTopicParam() {
    const topicUrlString = useParams().topic;
    const topic = parseUrlString(topicUrlString);
    if (ProgrammingTopicList.includes(topic as any)) return topic as ProgrammingTopic;
    return undefined;
}

const RankingPage: React.FC = () => {
    const navigate = useNavigate();
    const topic = useTopicParam();

    // If the topic param is invalid or empty, redirect to the global ranking page.
    useEffect(() => {
        if (!topic) navigate('/ranking');
    }, [topic]);

    return (
        <>
            <Helmet>
                <title>User Rankings | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Ranking page of ${AppProperty.APP_NAME} where users can browse their rankings.`}
                />
            </Helmet>
            <RankingContainer />
        </>
    );
};

export default RankingPage;
