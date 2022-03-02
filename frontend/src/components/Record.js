import '../css/Record.css';
import { AiOutlineCopy, AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import Collapsible from 'react-collapsible';
import { useState } from 'react';

const Record = (props) => {
    const [triggerJsx, setTriggerJsx] = useState(<AiOutlineDown />);

    return (<>
    <div className="RecordSummary">
        <div className='container'>
            <div className="RecordField" style={{ width:'100%'}}>
            <p className='RecordTitle'>
            {props.metadata.title[0]}    
            <AiOutlineCopy style={{ cursor: 'pointer', marginLeft:'10px'}}  onClick={() => {navigator.clipboard.writeText(JSON.stringify(props.metadata))}}/>
            </p>    

            <Collapsible trigger={triggerJsx} onTriggerOpening={() => setTriggerJsx(<AiOutlineUp/>)} onTriggerClosing={() => setTriggerJsx(<AiOutlineDown/>)}>
            <p>
                {props.metadata.description[0]}
            </p>
            </Collapsible>
            </div>
        </div>
        <div className='container'>
            <div className="RecordField" style={{ width:'33%'}}>
                <p className='FieldTitle'>Autor(a)</p> 
                <p className='FieldText'>
                {
                    props.metadata.creator
                }
                </p>
            </div>
            <div className="RecordField" style={{ width:'33%'}}>
                <p className='FieldTitle'>Co-autores(as)</p> 
                {
                    props.metadata.contributor.map((value, index) => {

                        let jsxObject= null
                        if(!value.match("[0-9]|http://lattes.cnpq.br/")) {
                            if(props.metadata.contributor[index + 1] && !!props.metadata.contributor[index + 1].match("http://lattes.cnpq.br/"))
                                jsxObject = <p className='FieldText' key={index}><a href={props.metadata.contributor[index + 1]} target="_blank">{value}</a></p>

                            else
                                jsxObject = <p className='FieldText' key={index}>{value}</p>
                        }
                        return jsxObject
                    })
                }
            </div>
            <div className="RecordField" style={{ width:'34%'}}>
                <p className='FieldTitle'>Tipo</p> 
                <p className='FieldText'> {props.metadata.type[0]}</p>
            </div>
        </div>
        <div className='container'>
            <div className="RecordField" style={{ width:'33%'}}>
            {
                    props.metadata.identifier.map((value, index) => {

                        let jsxObject= null
                        if(value.match("http://hdl.handle.net")) 
                            jsxObject = <p className='FieldText' key={index}><a href={value} target="_blank">Link para o pantheon</a></p>
                        
                        return jsxObject
                    })
                }
            </div>
        </div>
    </div>
    </>)
}

export default Record