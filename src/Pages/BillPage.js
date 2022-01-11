import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import "../Style/App.css";
import BillList from "../Components/Bill/BillList";

const BillPage = () => {
  const url = "https://db01-4-menuservice.herokuapp.com";
  const [bills, setbills] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const token = await getAccessTokenSilently();
    axios
      .get(`${url}/api/public/bills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setbills(response.data);
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <div>
        <h1>Bills</h1>
      </div>
      {bills && <BillList Key={bills.id} bills={bills} />}
    </div>
  );
};

export default withAuthenticationRequired(BillPage, {
  onRedirecting: () => <Loading />,
});
