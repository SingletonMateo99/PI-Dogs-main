import './App.css';

import InitialPage from './components/InitialPage/InitialPage';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home/Home'
import CreateDog from './components/create/CreateDog';

import Breed from './components/Detail/Breed';


function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/Welcome" element={<InitialPage/>} />
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/dogs/:id" render={({ match }) => (<Breed id={match.params.id} />)}/>
        <Route path="/create" element={<CreateDog/>}/>
      </Routes>
    </div>
  );
}

export default App;
