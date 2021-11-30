import React from "react";
import Navbar from "../src/Components/Main/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./Pages/Category";
import Dish from "./Pages/Dish";
import AddCategory from "./Pages/AddCategory.js";
import InventoryPage from "./Pages/InventoryPage.js";
import AddDish from "./Pages/AddDish.js";
import Kitchen from "./Pages/Kitchen.js";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/category" component={Category} />
          <Route exact path="/dish" component={Dish} />
          <Route exact path="/addcategory" component={AddCategory} />
          <Route exact path="/adddish" component={AddDish} />
          <Route exact path="/Inventory" component={InventoryPage} />
          <Route exact path="/Kitchen" component={Kitchen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
