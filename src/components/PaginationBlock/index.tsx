import ReactPaginate from "react-paginate";

import styles from "./PaginationBlock.module.scss";

type paginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

function PaginationBlock({ currentPage, onChangePage }: paginationProps) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
      //   renderOnZeroPageCount={null}
    />
  );
}

export default PaginationBlock;
