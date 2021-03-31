import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import AdminSideBar from "../components/AdminSideBar";
import "./Dashboard.css";
import axios from "axios";
function RegisterAdmin() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { isLoggedIn, role, myToken } = useContext(AuthContext);
  const history = useHistory();

  //chcek if this user is an admin or redirect to '/'
  useEffect(() => {
    if (role !== "admin" || isLoggedIn === false) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  //register new admin
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const RegisterData = {
      email,
      password,
      passwordCheck,
      displayName,
    };
    axios
      .post("https://pwctask.herokuapp.com/admins/register", RegisterData, {
        headers: { "x-auth-token": myToken },
      })
      .then(() => {
        setDisplayName("");
        setPassword("");
        setPasswordCheck("");
        setEmail("");
        setSuccess("Registered Successfully");
      })
      .catch((err) => err.response.data.msg && setError(err.response.data.msg));
  };
  if (role !== "admin") {
    return <></>;
  } else {
    return (
      <div className="dashboard__container">
        <AdminSideBar />
        <div className="dashboard__content">
          <div className="container">
            <div className="pageform">
              <h6>Register a new admin</h6>
              <div className="erros">
                <p>{error}</p>
                <p style={{ color: "green" }}>{success}</p>
              </div>
              <form onSubmit={handleRegister}>
                <input
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  value={displayName}
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  value={passwordCheck}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <button type="submit">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterAdmin;
