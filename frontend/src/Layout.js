import { listRecords } from './api';
import { toast } from 'react-toastify';
import logo from './ufrj.svg';
import './Layout.css';
import { useState } from 'react';
import MetadataTable from './components/MetadataTable';


const Layout = (props) => {
  const [metadata, setMetadata] = useState(null);
  
  const getRecords = (url, n_records, prefix, from, until) => {
    const raiseError = (message) => {
      const options = {
        autoClose: false,
        hideProgressBar: false,
        position: toast.POSITION.TOP_RIGHT,
      };
      toast.error(message, options);
    }
  
    const completion = (response) => {
        setMetadata(response.records)
    }
  
    listRecords(url, n_records, prefix, from, until, completion, raiseError)
  }
  
  return(
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form>
          <label>Nome do Repositório:</label>
          <input type="text" name="repo name" />
          </form>


          <button onClick={() => getRecords('https://pantheon.ufrj.br/oai/request', 10, 'oai_dc', '2016-01-01', '2019-01-15')}>
          Clica vai
          </button>


          {
            metadata &&
            <MetadataTable metadata={metadata}/>
          }


      </header>
      </div>
  )

}

export default Layout