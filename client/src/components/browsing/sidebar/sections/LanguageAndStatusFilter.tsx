import React from 'react';
import { ProgrammingTopicList, SubmissionStatusList } from '../../../../models/enums';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const LanguageAndStatusFilter = () => {
    return (
        <>
            <CustomSelect
                className="gap-1"
                labelText={<span className="font-semibold">Language</span>}
                id="language-select"
                options={['All', ...ProgrammingTopicList]}
            />
            <CustomSelect
                className="gap-1"
                labelText={<span className="font-semibold">Submission Status</span>}
                options={['All', ...SubmissionStatusList]}
                id="status-select"
            />
        </>
    );
};

export default LanguageAndStatusFilter;
