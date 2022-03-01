import Layout from './Layout';
import Sidebar from './components/Sidebar';
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
