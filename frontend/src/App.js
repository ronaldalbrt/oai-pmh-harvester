import logo from './ufrj.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <label>Nome do Repositório:</label>
          <input type="text" name="repo name" />
        </form>
      </header>
    </div>
  );
}

export default App;
