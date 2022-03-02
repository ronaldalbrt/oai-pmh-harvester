import Layout from './Layout';
import Sidebar from './components/Sidebar';
import Record from './components/Record';
import { useState } from 'react';

function App() {
  const [records, setRecords] = useState(null)

  return (
    <>
    <Sidebar records={records} setRecords={setRecords}/>
    <Layout records={records} setRecords={setRecords}/>
    </>
  );
}

export default App;
