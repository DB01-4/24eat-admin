import React from "react";
import AddInventory from "../Components/AddInventory";
import EditInventoryButton from "../Components/EditInventoryButton";
import InventoryTable from "../Components/InventoryTable";
import useFetch from "../useFetch";
import "../App.css";
import { useState } from "react";
import FetchAndShowTable from "../Components/FetchAndShowTable";

const InventoryPage = () => {
  const [value, setValue] = useState(1);

  return (
    <div>
      <h1>Inventory</h1>
      <FetchAndShowTable count={value} stateChanger={setValue} />
      <div className="flex-container">
        <AddInventory stateChanger={setValue} />
        <EditInventoryButton />
      </div>
    </div>
  );
};
export default InventoryPage;
