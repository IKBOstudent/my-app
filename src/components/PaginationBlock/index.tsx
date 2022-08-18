import ReactPaginate from "react-paginate";

import styles from "./PaginationBlock.module.scss";

type paginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const PaginationBlock = ({
  currentPage,
  onChangePage,
}: paginationProps) => {
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
    />
  );
};
