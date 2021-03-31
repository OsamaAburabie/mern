import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSideBar.css";
function AdminSideBar() {
  return (
    <div className="admin__side__bar">
      <NavLink to="manageTickits">
        <button className="sbar__btn ">Manage Tickets</button>
      </NavLink>
      <NavLink to="adminRegister">
        <button className="sbar__btn ">Register Admins</button>
      </NavLink>
    </div>
  );
}

export default AdminSideBar;
