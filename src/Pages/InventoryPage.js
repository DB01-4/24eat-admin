import React from "react";
import AddInventory from "../Components/Inventory/AddInventory";
import EditInventoryButton from "../Components/Inventory/EditInventoryButton";
import "../Style/App.css";
import { useState } from "react";
import FetchAndShowTable from "../Components/Inventory/FetchAndShowTable";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import SelectType from "../Components/Inventory/SelectType";

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}
let count = 0;

const InventoryPage = () => {
  const [value, setValue] = useState(1);
  const [filter, setFilter] = useState("produce");
  let forceUpdate = useForceUpdate();

  function ChangeFilter(_filter) {
    setFilter(_filter);
    console.log(filter);
    forceUpdate();
  }
  return (
    <div>
      <h1>
        <Typography variant="h4" component="div" gutterBottom>
          {filter}
        </Typography>
      </h1>
      <SelectType ChangeFilter={ChangeFilter} />
      <FetchAndShowTable
        count={value}
        stateChanger={setValue}
        filter={filter}
      />
      <div className="flex-container">
        <AddInventory stateChanger={setValue} filter={filter} />
        <EditInventoryButton unsavedChanges={true} />
        {/* Always assumes there were changes */}
      </div>
    </div>
  );
};
export default InventoryPage;
