import React from "react";
import { Component } from "react";
import "../Style/navbar.css";

class Navbar extends Component {
    render() {
      return (
          <div>
          <ul>
            <li><h4 className="link">Admin panel</h4></li>
            <li><a className="link" href="/Tables">Tables</a></li>
            <li><a className="link" href="/Category">Category</a></li>
            <li><a className="link" href="/AddCategory">Add category</a></li>
            <li><a className="link" href="/Dish">Dish</a></li>
            <li><a className="link" href="/Menu">Manage menu</a></li>
          </ul>
          </div>
      );
    }
}

export default Navbar;