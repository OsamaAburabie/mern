import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import "./DelAccPopup.css";

export function DelAccPopup(props) {
  const { myToken } = useContext(AuthContext);
  const [password, setPassword] = useState();
  const [wrong, setwrong] = useState("");

  // const password = "qwqw1212";
  const delAcc = async () => {
    const headers = {
      "x-auth-token": myToken,
    };
    const data = {
      password,
    };
    try {
      await axios
        .delete("https://pwctask.herokuapp.com/users/delete", {
          headers,
          data,
        })
        .then(() => {
          props.logOut();
        });
    } catch (err) {
      if (err.response.data.msg === "invalid password") {
        setwrong("Wrong password!");
      } else {
        setwrong("something went wrong :(");
      }
    }
  };
  const DeleteAcc = () => {
    if (!password) {
      setwrong("This feild cant't be empty!");
    } else {
      delAcc();
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="Msg">
          <h3>Are you sure? this can't be undone.</h3>
          <span style={{ color: "red", display: wrong ? "block" : "none" }}>
            {wrong}
          </span>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="Button-Close" onClick={DeleteAcc}>
          Delete Account
        </button>
      </Modal.Footer>
    </Modal>
  );
}
