import React from "react";
import Navbar from '../src/Components/Navbar.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Category from './Pages/Category';
import Dish from './Pages/Dish';
import AddCategory from "./Pages/AddCategory.js";

function App() {
  return (
    <Router>
      <Navbar/>
        <div>
          <Switch>
              <Route exact path='/category' component={Category} />
              <Route exact path='/product' component={Dish}/>
              <Route exact path='/addcategory' component={AddCategory}/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
