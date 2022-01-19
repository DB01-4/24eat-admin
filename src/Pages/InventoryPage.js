import React from "react";
import AddInventory from "../Components/Inventory/AddInventory";
import EditInventoryButton from "../Components/Inventory/EditInventoryButton";
import "../Style/App.css";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import SelectType from "../Components/Inventory/SelectType";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FetchTable from "../Components/Inventory/FetchTable";

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

const InventoryPage = () => {
  const [value, setValue] = useState(-1);
  const [filter, setFilter] = useState();
  let forceUpdate = useForceUpdate();
  const [childCount] = useState();
  console.log("reloaded inventory");

  function ChangeFilter(_filter) {
    setFilter(_filter);
    forceUpdate();
  }

  // function DetectChanges(bool) {
  //   if (!bool) {
  //     setBoolCount(boolCount + 1);
  //   } else {
  //     setBoolCount(boolCount - 1);
  //   }
  //   console.log("boolCount: " + boolCount);
  // }

  return (
    <div>
      <h1>
        <Typography variant="h4" component="div" gutterBottom>
          {filter}
        </Typography>
      </h1>
      <SelectType ChangeFilter={ChangeFilter} />
      <FetchTable count={value} filter={filter} />
      <div className="flex-container">
        <AddInventory stateChanger={setValue} filter={filter} />
        <EditInventoryButton unsavedChanges={childCount} />
        {/* Always assumes there were changes */}
      </div>
    </div>
  );
};

export default withAuthenticationRequired(InventoryPage, {
  onRedirecting: () => <Loading />,
});
