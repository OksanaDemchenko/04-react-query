import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  page: number;
  setPage: (selectedPage: number) => void;
}

export default function Pagination({ pageCount, page, setPage }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
