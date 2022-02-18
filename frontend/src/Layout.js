import { listRecords, listMetadataFormats, listSets } from './api';
import { toast } from 'react-toastify';
import logo from './ufrj.svg';
import './css/Layout.css';
import { useState, useEffect } from 'react';
import MetadataTable from './components/MetadataTable';
import Slider from '@mui/material/Slider';


const Layout = (props) => {
  const [metadata, setMetadata] = useState(null);
  const [numberOfRecords, setNumberOfRecords] = useState(10);
  const [sliderValuer, setSliderValue] = useState(100);
  const [sets, setSets] = useState(null);

  const handleSliderChange = (event, newValue) => {
    setNumberOfRecords(sliderValuer)
    setSliderValue(newValue);
};
  
  const getRecords = (data) => {
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
  
    listRecords(data, completion, raiseError)
  }

  const getFormats = (url) => {
    const raiseError = (message) => {
      const options = {
        autoClose: false,
        hideProgressBar: false,
        position: toast.POSITION.TOP_RIGHT,
      };
      toast.error(message, options);
    }
  
    const completion = (response) => {
      setMetadata(response.formats)
    }
  
    listMetadataFormats(url, completion, raiseError)

  }

  const getSets = (url) => {
    const raiseError = (message) => {
      const options = {
        autoClose: false,
        hideProgressBar: false,
        position: toast.POSITION.TOP_RIGHT,
      };
      toast.error(message, options);
    }
  
    const completion = (response) => {
      setSets(response.sets)
    }
  
    listSets(url, completion, raiseError)
  }

  useEffect(() => {
    getSets('https://pantheon.ufrj.br/oai/request')
  }, [])
  
  console.log(sets)
  return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <label>Quantidade de Repositórios a serem retornados</label>
          <Slider 
                    defaultValue={100} 
                    step={1} 
                    min={0} 
                    max={500} 
                    aria-label="Default" 
                    valueLabelDisplay="auto" 
                    onChange={handleSliderChange}
                    style={{width: '200px', margin:'10px auto'}}
          />
          <button onClick={() => getRecords(
            Object({
              url:'https://pantheon.ufrj.br/oai/request', 
              n_records: numberOfRecords,
              prefix: 'oai_dc', 
            }))
          }>
            Listar Repositórios
          </button>

          <button onClick={() => getFormats('https://pantheon.ufrj.br/oai/request')}>
            Listar Tipos de Metadadados
          </button>
      </header>


      {
        metadata &&
        <MetadataTable metadata={metadata}/>
      }
      </div>
  )

}

export default Layout