import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./admin/RegisterAdmin";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import "./index.css";
import AuthContext from "./context/AuthContext";
import ManageTickits from "./admin/ManageTickits";
function Routes() {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === undefined) {
    return <></>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/admin/adminRegister" component={RegisterAdmin} />
          <Route path="/admin/manageTickits" component={ManageTickits} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
