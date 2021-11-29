import React from "react";
import AddInventory from "../Components/Inventory/AddInventory";
import EditInventoryButton from "../Components/Inventory/EditInventoryButton";
import InventoryTable from "../Components/Inventory/InventoryTable";
import "../Style/inventory.css";
import { useState } from "react";
import FetchAndShowTable from "../Components/Inventory/FetchAndShowTable";

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
