//import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from "./components/Home/Home.jsx";
import DogsCreate from './components/DogsCreate/DogsCreate.jsx';
import Detail from './components/Detail/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component= {LandingPage}/>
          <Route path='/home' component= {Home}/>
          <Route path='/CreateDog' component= {DogsCreate}/>
          <Route path='/home/:id' component= {Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
