import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Category = () => {
  const serverUrl = "http://localhost:8080";

  const { getAccessTokenSilently, isLoading, user } = useAuth0();

  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //get token access token to make request
        const token = await getAccessTokenSilently();

        console.log(token);

        //private endpoint
        axios
          .get(`${serverUrl}/api/private/products`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((categories) => {
            setCategories(categories.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoading === false) {
      fetchCategories();
    }
  }, [isLoading]);

  //map all the names of categories
  return categories.map((category, index) => {
    return <div>{category.name}</div>;
  });
};

export default withAuthenticationRequired(Category, {
  onRedirecting: () => <Loading />,
});
