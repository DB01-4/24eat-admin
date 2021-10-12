import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Category from './Pages/Category';
import Product from './Pages/Product';
import Edit from './components/Edit';

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Edit/>
              <Route exact path='/' component={Home} />
              <Route exact path='/category' component={Category} />
              <Route exact path='/product' component={Product}/>
          </Switch>
        </div>
      </Router>
  );
}

//Home page from here 

const Home = () => (

  <div>
    <h1>Home</h1>

  </div>
   
);

export default App;
