import React from 'react'
import ReactPaginate from 'react-paginate';

function Pagination({
    currentPage,
    setCurrentPage,
    pageCount,
    handlePageClick
}) {
    return (
        <>
            <ReactPaginate
                previousLabel={'← 上一頁'}
                nextLabel={'下一頁 →'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'flex justify-center items-center z-0 rounded-md shadow-sm pb-4'}
                previousLinkClassName={'relative items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'}
                nextLinkClassName={'relative items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'}
                pageClassName={'z-10 bg-gray-50 border-gray-500 text-gray-600 relative items-center px-4 py-2 border text-sm font-medium'}
                activeClassName={'bg-gray-600 text-white'}
                activeLinkClassName={'text-white no-underline'}
            />
        </>
    )
}

export default Pagination
