import Order from "../Components/Kitchen/Order";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Kitchen = () => {

    return (
        <>
        <Order></Order>
        </>
    )
}

export default withAuthenticationRequired(Kitchen, {
    onRedirecting: () => <Loading />,
  });
