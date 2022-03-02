
import logo from './ufrj.svg';
import './css/Layout.css';
import Record from './components/Record';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

const Layout = (props) => {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;
    setOffset(newOffset);
  };


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
          props.records.map((value, i) => <Record key={i} metadata={value}/>)
        }
        
        
      </div>
  )

}

export default Layout