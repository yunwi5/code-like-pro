import { useDispatch } from 'react-redux';
import { LanguageList, SubmissionStatusList } from '../../../../models/enums';
import { browsingActions } from '../../../../store/redux/browsing-slice';
import { useAppSelector } from '../../../../store/redux/store';
import { languageCodesToReadableNames } from '../../../../utils/language';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const languageOptions = ['All', ...LanguageList];

const LanguageAndStatusFilter = () => {
    const { language, submissionStatus } = useAppSelector((state) => state.browsing.filtering);
    const dispatch = useDispatch();

    const handleLanguage = (lang: string) => {
        dispatch(browsingActions.setLanguage(lang as any));
    };

    const handleSubmissionStatus = (status: string) => {
        dispatch(browsingActions.setSubmissionStatus(status as any));
    };

    return (
        <>
            <CustomSelect
                className="gap-1"
                labelText={<span className="font-semibold">Language</span>}
                id="language-select"
                value={language}
                onChange={handleLanguage}
                options={languageOptions}
                optionLabels={languageCodesToReadableNames(languageOptions)}
            />
            <CustomSelect
                className="gap-1"
                labelText={<span className="font-semibold">Submission Status</span>}
                options={['All', ...SubmissionStatusList]}
                value={submissionStatus}
                onChange={handleSubmissionStatus}
                id="status-select"
            />
        </>
    );
};

export default LanguageAndStatusFilter;
