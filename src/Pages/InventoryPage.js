import React from "react";
import AddInventory from "../Components/Inventory/AddInventory";
import EditInventoryButton from "../Components/Inventory/EditInventoryButton";
import "../Style/App.css";
import { useState } from "react";
import FetchAndShowTable from "../Components/Inventory/FetchAndShowTable";
import Typography from "@mui/material/Typography";
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
  const [childCount, setChildCount] = useState();
  const [boolCount, setBoolCount] = useState(0);

  function ChangeFilter(_filter) {
    setFilter(_filter);
    console.log(filter);
    forceUpdate();
  }

  function DetectChanges(bool) {
    if (!bool) {
      setBoolCount(boolCount + 1);
    } else {
      setBoolCount(boolCount - 1);
    }
    console.log("boolCount: " + boolCount);
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
        CountChildren={setChildCount}
        DetectChanges={DetectChanges}
      />
      <div className="flex-container">
        <AddInventory stateChanger={setValue} filter={filter} />
        <EditInventoryButton unsavedChanges={childCount} />
        {/* Always assumes there were changes */}
      </div>
    </div>
  );
};
export default InventoryPage;
