import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import AdminSideBar from "../components/AdminSideBar";
import "./Dashboard.css";
import StatusSelect from "../components/StatusSelect";
import axios from "axios";
function ManageTickits() {
  const { isLoggedIn, role, myToken } = useContext(AuthContext);
  const [tickets, setTickets] = useState();
  const history = useHistory();

  //fetch all tickets for all users by admin
  function fetchData() {
    axios
      .get("https://pwctask.herokuapp.com/admins/allTickets", {
        headers: { "x-auth-token": myToken },
      })
      .then((req) => {
        setTickets(req.data);
      });
  }

  //chcek if this user is an admin or redirect to '/'
  useEffect(() => {
    if (role !== "admin" || isLoggedIn === false) {
      history.push("/");
    } else {
      fetchData();
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  if (role !== "admin") {
    return <></>;
  } else {
    return (
      <div className="dashboard__container">
        <AdminSideBar />
        <div className="dashboard__content">
          {tickets && (
            <table className="zebra">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Date Created</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((el) => (
                  <tr key={el._id}>
                    <td>{el.title}</td>
                    <td>{el.body}</td>
                    <td>{el.createdAt}</td>
                    <td>{el.email}</td>
                    <td>
                      <StatusSelect
                        id={el._id}
                        status={el.status}
                        fetching={fetchData}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default ManageTickits;
