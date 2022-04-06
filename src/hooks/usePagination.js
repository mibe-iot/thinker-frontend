import { useState } from "react";


export const usePagination = (startPage, itemsCount, pageSize) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(itemsCount / pageSize);
    const minPage = 1;
    const incrementPage = () => { setCurrentPage(Math.min(maxPage, currentPage + 1)) }
    const decrementPage = () => { setCurrentPage(Math.max(minPage, currentPage - 1)) }
    return {
        page: currentPage,
        incrementPage,
        decrementPage,
        isFirstPage: currentPage === minPage,
        isLastPage: currentPage === maxPage
    }
}