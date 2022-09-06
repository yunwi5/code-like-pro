import React, { useEffect, useMemo, useState } from 'react';

// Custom hook for managing pagination like pagination for exercise list.
function usePagination<T>({ array, itemPerPage }: { array: T[]; itemPerPage: number }) {
    // State for pagination. Pagination is index based.
    const [page, setPage] = useState(0);

    // Last page number index based.
    const maxPage = Math.floor(Math.max(array.length - 1, 0) / itemPerPage);

    const currentPageItems = useMemo(() => {
        const startIndex = page * itemPerPage;
        return array.slice(startIndex, startIndex + itemPerPage);
    }, [page, array]);

    // If the array length changes, go back to the first page.
    // So that user is not left with the empty page (due to the filtering).
    useEffect(() => {
        setPage(0);
    }, [array.length]);

    // Return current page items as an array.
    return { array: currentPageItems, page, setPage, maxPage };
}

export default usePagination;