import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AppProperty } from '../constants/app';

const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Home page of ${AppProperty.APP_NAME} where users can see detailed information about programming exercises on the website.`}
                />
            </Helmet>
            <section className="h-[80vh] w-full flex-center flex-col">
                <div>Home</div>
                <Link className="text-blue-500" to="/exercise/630c2cd2127fc69377732710">
                    Example exercise attempt page
                </Link>
            </section>
        </>
    );
};

export default Home;
