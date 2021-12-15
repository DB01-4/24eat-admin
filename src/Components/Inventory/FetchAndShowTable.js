import InventoryTable from "../Inventory/InventoryTable";

import React, { Component } from "react";

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
    const url = "http://localhost:8084/api/items";
    const response = await fetch(url);
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
      const url = "http://localhost:8084/api/items";
      const response = await fetch(url);
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
