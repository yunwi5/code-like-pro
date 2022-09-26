import React from 'react';
import usePagination from '../../../hooks/usePagination';
import { IExercise, IShowCase } from '../../../models/interfaces';
import ShowcaseCard from '../cards/ShowcaseCard';
import PageNavigation from '../PageNavigation';

// Default value of exercisePerPage which is applied when the prop was not given.
const SHOWCASE_PER_PAGE = 10;

interface Props {
    showcases: IShowCase[];
    showcasesPerPage?: number;
    exercise: IExercise;
}

const ShowcaseList: React.FC<Props> = ({
    showcases,
    showcasesPerPage = SHOWCASE_PER_PAGE,
    exercise,
}) => {
    const {
        array: currentPageShowcases,
        page,
        setPage,
        maxPage,
    } = usePagination<IShowCase>({
        array: showcases,
        itemPerPage: showcasesPerPage,
    });

    const handlePage = (newPage: number) => setPage(newPage);

    return (
        <section className="lg:basis-2/3">
            <div className="flex flex-col gap-5 mb-8">
                {currentPageShowcases.map((sc, idx) => (
                    <ShowcaseCard
                        key={sc._id}
                        showcase={sc}
                        exercise={exercise}
                        className={idx % 2 === 1 ? 'bg-gray-100' : ''}
                    />
                ))}
            </div>
            <PageNavigation
                currentPage={page}
                totalPages={maxPage}
                onChangePage={handlePage}
            />
        </section>
    );
};

export default ShowcaseList;
