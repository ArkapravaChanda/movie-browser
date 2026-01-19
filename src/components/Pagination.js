import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span>{page}</span>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
