import './App.css';
import Card from './components/Card/Card';
import InitialPage from './components/InitialPage/InitialPage';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/Welcome" element={<InitialPage/>} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
