import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import "./Login.css";
function Register() {
  const [email, setEmail] = useState();
  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const { isLoggedIn, checkLoggedIn, role } = useContext(AuthContext);
  const [error, setError] = useState();
  const history = useHistory();
  //check if user is logged in already redirect to '/' and if they are admin redirect to dashboard
  useEffect(() => {
    if (isLoggedIn && role === "admin") {
      history.push("/admin/manageTickits");
    } else if (isLoggedIn && role === "customer") {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  //register handler
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const RegisterData = {
        email,
        password,
        passwordCheck,
        displayName,
      };

      const loginRes = await axios.post(
        "https://pwctask.herokuapp.com/users/register",
        RegisterData
      );
      if (loginRes.data.token) {
        localStorage.setItem("auth-token", loginRes.data.token);
        checkLoggedIn();
      }
      // history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="pageform">
          <h6>Register a new account</h6>
          <div className="erros">
            <p>{error}</p>
          </div>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Register;
