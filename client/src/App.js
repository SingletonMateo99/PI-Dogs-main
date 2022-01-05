import './App.css';

import InitialPage from './components/InitialPage/InitialPage';
import NavBar from './components/NavBar/NavBar';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from './components/Home/Home'
import CreateDog from './components/create/CreateDog';

import Breed from './components/Detail/Breed';


function App() {
  return (
    <div className="App">
    <BrowserRouter> 
<Switch>
          
          <Route exact path="/" component={InitialPage} />
          <Route>
          <Route exact path="/home" component={Home}  />
          <Route exact path="/dogs/:id" render={({ match }) => <Breed id={match.params.id} />}></Route>
          <Route exact path="/create" component={CreateDog} />
          </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}


{/* <Routes>
        <Route path="/Welcome" element={<InitialPage/>} />
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/dogs/:id" render={({ match }) => (<Breed id={match.params.id} />)}/>
        <Route path="/create" element={<CreateDog/>}/>
      </Routes> */}
export default App;
