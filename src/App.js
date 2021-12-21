import React from "react";
import Navbar from "../src/Components/Main/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./Pages/Category";
import Dish from "./Pages/Dish";
import AddCategory from "./Pages/AddCategory.js";
import Loading from "../src/Components/Login/Loading";
import InventoryPage from "./Pages/InventoryPage.js";
import AddDish from "./Pages/AddDish";
import { useAuth0 } from "@auth0/auth0-react";
import BillPage from "./Pages/BillPage";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

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
          <Route exact path="/bills" component={BillPage} />
          <Route exact path="/loading" component={Loading} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
