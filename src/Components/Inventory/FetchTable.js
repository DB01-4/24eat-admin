import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import InventoryTable from "./InventoryTable";

export default function FetchTable(props, { stateChanger }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsPending] = useState(true);
  /* eslint-disable */
  const [count, setCount] = useState(0);

  const getItems = async () => {
    axios
      .get("https://db01-4-imsservice.herokuapp.com/api/public/items")
      .then((response) => {
        console.log(response.data);
        const myItems = response.data;
        setData(myItems);
        setIsPending(false);
      });
  };

  useEffect(() => {
    getItems();
    setCount(props.count);
    /* eslint-disable */
  }, [props.count]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!isLoading) {
    return (
      <div>
        {data && (
          <InventoryTable
            items={data}
            getItems={getItems}
            stateChanger={stateChanger}
            props={props}
          />
        )}
      </div>
    );
  }
}
