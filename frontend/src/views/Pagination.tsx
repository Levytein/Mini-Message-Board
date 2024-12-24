
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const getPageNumbers = () => {
        const sidePages = 1; 
        const pages = [];
      
        for (let i = Math.max(1, currentPage - sidePages); i <= Math.min(totalPages, currentPage + sidePages); i++) {
            pages.push(i);
        }
    
      return pages;
    };
  
    return (
      <div className="pagination">

        <button className="nav"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
  
        {getPageNumbers().map((page) => (
          <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'nav active' : 'nav inactive'}
          >
            {page}
          </button>
        ))}
  
        <button className="nav"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >

            {">"}

        </button>
      </div>
    );
  };
  
  export default Pagination;