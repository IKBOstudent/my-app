import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './PaginationBlock.module.scss';

function PaginationBlock({ currentPage, onChangePage }) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            forcePage={Number(currentPage) - 1}
            renderOnZeroPageCount={null}
        />
    );
}

export default PaginationBlock;
