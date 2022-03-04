import { listRecords, listMetadataFormats, listSets } from '../api';
import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import Slider from '@mui/material/Slider';
import { Input } from '@mui/material';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import '../css/Sidebar.css';


const Sidebar = (props) => {
    const [metadata, setMetadata] = useState(null);
    const [numberOfRecords, setNumberOfRecords] = useState(100);
    const [sliderValue, setSliderValue] = useState(100);
    const [sets, setSets] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);
    const [selectedFormat, setSelectedFormat] = useState('oai_dc');

    const handleSliderChange = (event, newValue) => {
        setNumberOfRecords(sliderValue)
        setSliderValue(newValue);
      };
    
      const handleInputChange = (event) => {
        setNumberOfRecords(event.target.value === '' ? '' : Number(event.target.value))
        setSliderValue(event.target.value === '' ? '' : Number(event.target.value));
      };
    
      const handleBlur = () => {
        if (sliderValue < 0) setSliderValue(0);
        
        else if (sliderValue > 500) setSliderValue(500);       
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
            props.setRecords(response.records)
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
          setMetadata(response.formats.map((value) => value['metadataPrefix']))
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
          setSelectedSet(response.sets[0].id)
        }
      
        listSets(url, completion, raiseError)
      }
    
      useEffect(() => {
        getSets('https://pantheon.ufrj.br/oai/request')
        getFormats('https://pantheon.ufrj.br/oai/request')
      }, [])

    return (
    <div style={{ position: 'absolute', display: 'flex', height: '100vh',overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Parâmetros
            </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
        
            <CDBSidebarMenuItem>
                <div className='FormDiv'>
                    <label>Quantidade de bases:</label> <br/>
                    <Slider 
                        defaultValue={100} 
                        value={sliderValue}
                        step={1} 
                        min={0} 
                        max={500} 
                        aria-label="Default" 
                        valueLabelDisplay="auto" 
                        onChange={handleSliderChange}
                        style={{width: '140px', marginTop:'10px'}}
                        color="info"
                    />
                    <Input
                        value={sliderValue}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        style={{ width: '60px', marginLeft:'20px', height:'20px' }}
                        inputProps= {{
                            step: 1,
                            min: 0,
                            max: 500,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                            style: {
                                color: 'white',
                                borderColor: 'white'
                            }
                        }}
                    />
                </div>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem></CDBSidebarMenuItem>
        
            <CDBSidebarMenuItem>
            { 
                sets &&
                <div className='FormDiv'> 
                    <label>Coleções disponíveis:</label> <br/>
                    <select name="setSelect" style={{width: '200px'}} onChange={(event) => setSelectedSet(event.target.value)}>
                    {
                        sets.map((value,index) => {
                        return <option key={index} value={value['id']}>
                            {value['nome']}
                        </option>
                        })
                    }
                    </select> 
                </div>
            }
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem></CDBSidebarMenuItem>
        
            <CDBSidebarMenuItem >
            {
                metadata &&        
                <div className='FormDiv'>
                    <label>Padrão de Metadados:</label><br/>
                    <select name="metadataSelect" style={{width: '200px'}}  defaultValue={'oai_dc'} onChange={(event) => setSelectedFormat(event.target.value)}>
                    {
                        metadata.map((value, index) => {
                        return <option key={index} value={value}>
                            {value}
                        </option>
                        })
                    }
                    </select>
                </div>
            }

            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem></CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
            <div className='FormDiv'>
                <button className='GetRecordsButton' onClick={() => getRecords(
                Object({
                    url:'https://pantheon.ufrj.br/oai/request', 
                    n_records: numberOfRecords,
                    prefix: selectedFormat, 
                    set: selectedSet
                }))
                }>
                Listar Bases
                </button>
            </div>
            </CDBSidebarMenuItem>
            
            </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
            style={{
                padding: '20px 5px',
            }}
            >
            UFRJ 2021.2
            </div>
        </CDBSidebarFooter>
        </CDBSidebar>
    </div>
    );
};

export default Sidebar;