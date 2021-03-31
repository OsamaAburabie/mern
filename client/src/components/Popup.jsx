import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Popup.css";

export function Popup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="Msg">
          <h2>Thank You For Your Submission</h2>
          <h5>Check your profile page for more information</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link className="Button-Close" to="/profile">
          Go to profile
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
