import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface Props {
  currentPage: number;
  maxPage: number;
  onChangePage: (newPage: number) => void;
  className?: string;
}

function createAdjacentPageList(currentPage: number, maxPage: number) {
  const pages = [];
  if (currentPage + 4 < maxPage) {
    const startPage = currentPage < 2 ? 0 : currentPage - 2;
    const endPage = currentPage < 2 ? 4 : currentPage + 2;
    for (let p = startPage; p <= endPage; p++) {
      pages.push(p);
    }
    return pages;
  } else {
    for (let p = maxPage - 4; p <= maxPage; p++) {
      pages.push(p);
    }
    return pages;
  }
}

const navBtnClass =
  'flex-center w-[2rem] h-[2rem] rounded-sm text-2xl hover:bg-gray-200/90 cursor-pointer';

const PageNavigation: React.FC<Props> = ({
  currentPage, // index based
  maxPage, // index based
  onChangePage,
  className = '',
}) => {
  const pageList = createAdjacentPageList(currentPage, maxPage);

  const currentPageCloseToEnd = currentPage + 4 >= maxPage;

  if (maxPage <= 0) return null;

  const dots = <span>...</span>;

  return (
    <div className={`flex-center gap-3 ${className}`}>
      {/* Navigate to previous page */}
      <div
        onClick={() => currentPage !== 0 && onChangePage(currentPage - 1)}
        className={`${navBtnClass} ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <BsChevronLeft />
      </div>

      {/* First Page displayed only if the currrent page is close to the last page. */}
      {currentPageCloseToEnd && maxPage >= 5 && (
        <>
          <PageLabel page={0} onClick={() => onChangePage(0)} currentPage={maxPage} />
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
            page={maxPage}
            currentPage={currentPage}
            onClick={() => onChangePage(maxPage)}
          />
        </>
      )}

      {/* Navigate to next page */}
      <div
        onClick={() => currentPage !== maxPage && onChangePage(currentPage + 1)}
        className={`${navBtnClass} ${
          currentPage === maxPage ? 'opacity-50 cursor-not-allowed' : ''
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
