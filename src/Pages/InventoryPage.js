import React from "react";
import AddInventory from "../Components/AddInventory";
import EditInventoryButton from "../Components/EditInventoryButton";
import InventoryTable from "../Components/InventoryTable";
import useFetch from "../useFetch";
import "../App.css";

const InventoryPage = () => {
  const {
    data: items,
    error,
    isPending,
  } = useFetch("http://localhost:8084/api/items");

  return (
    <div>
      <h1>Inventory</h1>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {items && <InventoryTable items={items} />}
      <div className="flex-container">
        <AddInventory />
        <EditInventoryButton />
      </div>
    </div>
  );
};
export default InventoryPage;
