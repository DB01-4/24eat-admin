import React from "react";
import { Component } from "react";
import "../Style/navbar.css";

class Navbar extends Component {
    render() {
      return (
          <div>
          <ul>
            <li><a className="link" href="/Category">Category</a></li>
            <li><a className="link" href="/Dish">Dish</a></li>
          </ul>
          </div>
      );
    }
}

export default Navbar;