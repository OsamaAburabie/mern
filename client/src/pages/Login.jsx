import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import { useHistory } from "react-router";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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

  //login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loginData = {
        email,
        password,
      };

      const loginRes = await axios.post(
        "https://pwctask.herokuapp.com/users/login",
        loginData
      );
      if (loginRes.data.token) {
        localStorage.setItem("auth-token", loginRes.data.token);
        checkLoggedIn();
      }
      // history.push("/");
    } catch (err) {
      // setError(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="pageform">
          <h6>Log in to your account</h6>
          <div className="erros">
            <p>{error}</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              autoComplete="true"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Login;
