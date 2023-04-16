import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface Props {
    currentPage: number;
    totalPages: number;
    onChangePage: (newPage: number) => void;
    className?: string;
}

function createAdjacentPageList(currentPage: number, totalPages: number) {
    let pages = [];
    if (currentPage + 4 < totalPages) {
        let startPage = currentPage < 2 ? 0 : currentPage - 2;
        let endPage = currentPage < 2 ? 4 : currentPage + 2;
        for (let p = startPage; p <= endPage; p++) {
            pages.push(p);
        }
        return pages;
    } else {
        for (let p = totalPages - 4; p <= totalPages; p++) {
            pages.push(p);
        }
        return pages;
    }
}

const navBtnClass =
    'flex-center w-[2rem] h-[2rem] rounded-sm text-2xl hover:bg-gray-200/90 cursor-pointer';

const PageNavigation: React.FC<Props> = ({
    currentPage,
    totalPages,
    onChangePage,
    className = '',
}) => {
    const pageList = createAdjacentPageList(currentPage, totalPages);

    const currentPageCloseToEnd = currentPage + 4 >= totalPages;

    const dots = <span>...</span>;

    return (
        <div className={`flex-center gap-3 ${className}`}>
            {/* Navigate to previous page */}
            <div
                onClick={() => currentPage !== 0 && onChangePage(currentPage - 1)}
                className={`${navBtnClass} ${
                    currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <BsChevronLeft />
            </div>

            {/* First Page displayed only if the currrent page is close to the last page. */}
            {currentPageCloseToEnd && totalPages >= 5 && (
                <>
                    <PageLabel
                        page={0}
                        onClick={() => onChangePage(0)}
                        currentPage={totalPages}
                    />
                    {dots}
                </>
            )}

            {pageList.map((page) => (
                <PageLabel
                    key={page}
                    onClick={() => onChangePage(page)}
                    page={page}
                    currentPage={currentPage}
                />
            ))}

            {/* Last page displayed only if the current page is not close to end. */}
            {!currentPageCloseToEnd && (
                <>
                    {dots}
                    <PageLabel
                        page={totalPages}
                        currentPage={currentPage}
                        onClick={() => onChangePage(totalPages)}
                    />
                </>
            )}

            {/* Navigate to next page */}
            <div
                onClick={() =>
                    currentPage !== totalPages && onChangePage(currentPage + 1)
                }
                className={`${navBtnClass} ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <BsChevronRight />
            </div>
        </div>
    );
};

const PageLabel: React.FC<{
    page: number;
    currentPage?: number;
    onClick: () => void;
}> = ({ page, currentPage, onClick }) => {
    if (page < 0) return null;

    return (
        <span
            className={`flex-center w-[1.8rem] h-[1.8rem] rounded-md hover:bg-gray-200/90 cursor-pointer ${
                currentPage === page ? 'text-main-500/90 font-bold' : ''
            }`}
            onClick={onClick}
        >
            {page + 1}
        </span>
    );
};

export default PageNavigation;
