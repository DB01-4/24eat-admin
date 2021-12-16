import InventoryTable from "../Inventory/InventoryTable";

import React, { Component } from "react";

const baseUrl = "https://db01-4-imsservice.herokuapp.com";

export default class FetchAndShowTable extends Component {
  state = {
    loading: true,
    items: null,
    count: 0,
    filter: "",
    CountChildren: "",
    DetectChanges: "",
    stateChanger: "",
  };

  async componentDidMount() {
    const response = await fetch(baseUrl + "/api/public/items");
    const data = await response.json();
    this.setState({
      items: data,
      loading: false,
      count: this.props.count,
      filter: this.props.filter,
      CountChildren: this.props.CountChildren,
      DetectChanges: this.props.DetectChanges,
      stateChanger: this.props.stateChanger,
    });
  }

  async componentDidUpdate(prevState) {
    if (
      this.props.count !== prevState.count ||
      this.props.filter !== prevState.filter
    ) {
      console.log("count changed");
      const response = await fetch(baseUrl + "/api/public/items");
      const data = await response.json();
      this.setState({
        items: data,
        loading: false,
        count: this.props.count,
        filter: this.props.filter,
        CountChildren: this.props.CountChildren,
        DetectChanges: this.props.DetectChanges,
        stateChanger: this.props.stateChanger,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.items) {
      return <div>didn't get an item</div>;
    }

    return (
      <div>
        <InventoryTable items={this.state.items} props={this.state} />
      </div>
    );
  }
}
