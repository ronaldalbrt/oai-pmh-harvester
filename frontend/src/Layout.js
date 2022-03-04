
import { useState, useEffect } from 'react';
import logo from './ufrj.svg';
import './css/Layout.css';
import Record from './components/Record';
import ReactPaginate from 'react-paginate';

const Layout = (props) => {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;
    setOffset(newOffset);
  };

  useEffect(() => {
    if (props.records)
      setPageCount(Math.ceil(props.records.length / perPage));
  }, [props.records, perPage])

  return(
      <div className="App">
        { 
          !props.records &&
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          </header>
        }
        {
          props.records &&
          <>
          {props.records.slice(offset, offset + perPage).map((value, i) => <Record key={i} metadata={value}/>)}
          <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
          </>
        }
        
        
      </div>
  )

}

export default Layout