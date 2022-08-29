import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';

import { getExercises } from '../../apis/exercise/exercise';
import BrowsingMain from '../../components/browsing/BrowsingMain';
import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';

const BrowsingPage: React.FC = () => {
    const { isLoading, error, data } = useQuery(['exercises'], () =>
        getExercises().then((res) => res.data),
    );

    if (error) {
        console.log(error);
        return <h1 className="text-center">Something went wrong...</h1>;
    }

    console.log(data);

    return (
        <>
            <Helmet>
                <title>Browsing Challenge | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Challenge browsing page where users can browse the progmmraing challenges with advanced searching, sorting and filtering functionalities."
                />
            </Helmet>

            {/* If is loading, show the loading spinner */}
            {isLoading && (
                <div className="min-h-[70vh] w-full mb-[12vh] flex-center pr-20">
                    <PacmanLoader size={100} color="#3c38e0dd" />
                </div>
            )}
            {!isLoading && <BrowsingMain exercises={data || []} />}
        </>
    );
};

export default BrowsingPage;
