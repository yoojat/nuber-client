import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import OutHome from "../../Routes/OutHome";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import SocialLogin from "../../Routes/SocialLogin";
import VerifyPhone from "../../Routes/VerifyPhone";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoute /> : <LoggedOutRoute />}
  </BrowserRouter>
);

const LoggedOutRoute: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={OutHome} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone/:number"} component={VerifyPhone} />
    {/* ex) /verify-phone/01021231222 */}
    <Route path={"/social-phone"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoute: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/ride"} exact={true} component={Ride} />
    {/* ride also need id but we use method to using memory */}
    <Route path={"/edit-account"} exact={true} component={EditAccount} />
    <Route path={"/settings"} exact={true} component={Settings} />
    <Route path={"/places"} exact={true} component={Places} />
    <Route path={"/add-place"} exact={true} component={AddPlace} />
    <Route path={"/find-address"} exact={true} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
    {/* redirect는 맨 마지막에! */}
  </Switch>
);
AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
