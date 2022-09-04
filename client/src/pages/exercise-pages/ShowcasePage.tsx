import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { AppProperty } from '../../constants/app';
import useAuth from '../../hooks/useAuth';

const ShowcasePage = () => {
    useAuth();
    const params = useParams();
    const exerciseId = params.id;
    // Send the request to get the showcase data of this exercise.

    return (
        <>
            <Helmet>
                <title>ShowCase | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Showcase page of a programming exercise where users can post their code, view other users' coding solutions and discuss the efficiency."
                />
            </Helmet>
            <div className="flex-center min-h-[82.5vh]">
                <p className="text-blue-600 text-lg">Showcase page {exerciseId}</p>
            </div>
        </>
    );
};

export default ShowcasePage;
