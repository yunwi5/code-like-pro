import React from 'react';
import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';

const ExerciseCreation = () => {
    return (
        <>
            <Helmet>
                <title>Create Challenge | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Exercise creation page of ${AppProperty.APP_NAME} where users can create a new programming challenge in various programming languages.`}
                />
            </Helmet>
            <div>ExerciseCreation</div>
        </>
    );
};

export default ExerciseCreation;
