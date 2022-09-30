import { Link } from 'react-router-dom';
import { ProgrammingTopicList } from '../../models/enums';
import { useTopicParam } from '../../pages/ranking/TopicRankingPage';
import { getGlobalRankigLink, getTopicRankingLink } from '../../utils/links';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import RankingHeader from './sections/RankingHeader';

const RankingSideBar: React.FC<{ className?: string }> = ({ className = '' }) => {
    const topic = useTopicParam();

    return (
        <aside className={`flex flex-col items-end pt-[6.5rem] ${className}`}>
            <RankingHeader className="mb-8" />
            <section className="w-fit mt-10 px-3 py-2 bg-gray-100 rounded transition-all shadow-md hover:shadow-lg text-gray-600">
                <h3 className="mb-1 whitespace-nowrap">
                    <Link
                        to={getGlobalRankigLink()}
                        className={`link-underline-effect w-fit text-lg ${
                            !topic ? 'text-main-400 font-semibold' : ''
                        }`}
                    >
                        Global Rankings
                    </Link>
                </h3>
                <div>
                    <h3 className="text-lg mb-1">Topic Rankings</h3>
                    <div className="flex flex-col gap-2 pl-2">
                        {ProgrammingTopicList.map((topic) => (
                            <ActiveNavLink
                                key={topic}
                                to={getTopicRankingLink(topic)}
                                activeClassName="!text-main-400 font-bold"
                                className="link-underline-effect w-fit text-gray-600/90"
                            >
                                {topic}
                            </ActiveNavLink>
                        ))}
                    </div>
                </div>
            </section>
        </aside>
    );
};

export default RankingSideBar;
