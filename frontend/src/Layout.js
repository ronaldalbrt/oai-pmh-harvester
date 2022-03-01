
import logo from './ufrj.svg';
import './css/Layout.css';

const Layout = (props) => {
  console.log(props.records)
  return(
      <div className="App">
        { 
        !props.records &&
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        }
      </div>
  )

}

export default Layout