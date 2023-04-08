import React from 'react';
import { motion } from 'framer-motion';
import usePagination from '../../../hooks/utils/usePagination';
import { IIssueReport } from '../../../models/interfaces';
import { listItemAnimations } from '../../../utils/animations.util';
import IssueReportCard from '../cards/IssueReportCard';
import PageNavigation from '../PageNavigation';

interface Props {
  reports: IIssueReport[];
  reportsPerPage?: number;
}

// Default value of exercisePerPage which is applied when the prop was not given.
const DEFAULT_PER_PAGE = 7;

const IssueReportList: React.FC<Props> = ({ reports, reportsPerPage }) => {
  const {
    array: currentPageReports,
    page,
    setPage,
    maxPage,
  } = usePagination<IIssueReport>({
    array: reports,
    itemPerPage: reportsPerPage ?? DEFAULT_PER_PAGE,
  });

  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col gap-4 mb-8">
        {currentPageReports.map((report, idx) => (
          <motion.div
            key={report._id}
            variants={listItemAnimations}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, delay: idx * 0.07 }}
          >
            <IssueReportCard
              key={report._id}
              report={report}
              className={idx % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-100'}
            />
          </motion.div>
        ))}
      </div>

      <PageNavigation
        currentPage={page}
        totalPages={maxPage}
        onChangePage={handlePage}
        className="mt-auto"
      />
    </div>
  );
};

export default IssueReportList;
