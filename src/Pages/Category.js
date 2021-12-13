import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CategoryList from "../Components/Category/CategoryList";

const Category = () => {
  return <CategoryList />;
};

// export default withAuthenticationRequired(Category, {
//   onRedirecting: () => <Loading />,
// });

export default Category;
