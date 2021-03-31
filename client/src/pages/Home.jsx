import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";

import "./Home.css";
import { Popup } from "../components/Popup";
import { Link } from "react-router-dom";
function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { isLoggedIn, role, myToken, email } = useContext(AuthContext);
  const [error, setError] = useState();
  const [submited, setSubmit] = useState(false);

  const history = useHistory();
  //check for logged in user role and login status
  useEffect(() => {
    if (isLoggedIn && role === "admin") {
      history.push("/admin/manageTickits");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  //sending tickets
  const handleTicket = async (e) => {
    e.preventDefault();
    setError("");
    const ticket = {
      title,
      body,
      email,
    };

    axios
      .post("https://pwctask.herokuapp.com/users/addTickets", ticket, {
        headers: { "x-auth-token": myToken },
      })
      .then(() => {
        setTitle("");
        setBody("");
        // setSuccess("Your ticket is under process ");
        setSubmit(true);
      })
      .catch((err) => err.response.data.msg && setError(err.response.data.msg));
  };

  //================popup props ================

  const Close = () => {
    setSubmit(false);
  };

  //===========================================
  if (isLoggedIn) {
    return (
      <div className="Home__container">
        <div className="pageform">
          <h6>Do you have any complains?</h6>
          <div className="erros">
            <p>{error}</p>
          </div>
          <form onSubmit={handleTicket}>
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={body}
              type="text"
              placeholder="More details..."
              onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <Popup show={submited} onHide={Close} />
        </div>
      </div>
    );
  }
  return (
    <div className="Home__container">
      <h2>You should be logged in to send complains</h2>
      <Link to="/login">
        <button className="nav__btn">Login</button>
      </Link>
    </div>
  );
}

export default Home;
