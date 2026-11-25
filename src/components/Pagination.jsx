import { PRODUCTS_PER_PAGE } from "../api";

function Pagination({ page, total, onChange }) {
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="btn-outline"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === page ? "btn" : "btn-outline"}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="btn-outline"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
