import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { useLocation } from "react-router";
import Navbar from "./NavBar";
import SideBar from "./SideBar";

export default function DisplayTask() {
  const location = useLocation();
  const data = location.state?.data;

  // const url = "http://localhost:3001";
  const url = "https://mytasks-be.herokuapp.com";
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [successMssg, setSuccessMssg] = useState("");
  const [errorMssg, setErrorMssg] = useState("");

  const [loading, setLoading] = useState(false);

  const handleStatus = () => {
    var x = document.getElementById("statusLabel").innerText;
    setBtnDisabled(!btnDisabled);
    if (x === "PENDING")
      document.getElementById("statusLabel").innerText = "COMPLETED";
    else document.getElementById("statusLabel").innerText = "PENDING";
  };

  const updateTask = (status) => {
    setLoading(true);
    setSuccessMssg("");
    setErrorMssg("");
    fetch(`${url}/updatetask`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        taskId: data.taskId,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "success") {
          setSuccessMssg("Task updated!");
        } else {
          setErrorMssg("Failed. Please refresh the page and try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container-fluid" style={{ padding: "0px" }}>
        <Navbar />
        <div className="row" style={{ margin: "0px" }}>
          <div
            className="col-8 "
            style={{ backgroundColor: "#F9EBF6", minHeight: "100vh" }}
          >
            <div style={{ paddingTop: "70px" }}>
              <div className="input-group mt-3" style={{ width: "60%" }}>
                <span className="input-group-text" id="basic-addon1">
                  <b>Task name</b>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={data.heading}
                  readOnly
                />
              </div>
              <div className="input-group mt-3" style={{ width: "60%" }}>
                <span className="input-group-text">
                  <b>Notes</b>
                </span>
                <textarea
                  className="form-control"
                  readOnly
                  value={data.notes}
                ></textarea>
              </div>
              <div className="input-group mt-3" style={{ width: "60%" }}>
                <span className="input-group-text" id="basic-addon1">
                  <b>Task type</b>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={data.tasktype.type}
                  readOnly
                />
              </div>
              <div className="input-group mt-3" style={{ width: "60%" }}>
                <span className="input-group-text" id="basic-addon1">
                  <b>Created on: </b>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={data.creationdate}
                  readOnly
                />
              </div>
              <div className="mt-3 ms-2">
                <span style={{}}>
                  <b>Status : </b>
                </span>
                <div
                  className="form-check form-switch ms-3"
                  style={{ display: "inline-block" }}
                >
                  {data.status !== "PENDING" ? (
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchChec"
                        disabled
                      />
                      <span id="statusLabel">{data.status}</span>
                    </div>
                  ) : (
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={() => handleStatus()}
                      />
                      <span id="statusLabel">{data.status}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="btn btn-success mt-5 ms-3"
                disabled={btnDisabled}
                onClick={() => updateTask("COMPLETED")}
              >
                Update
              </button>
              <button
                className="btn btn-danger mt-5 ms-5"
                onClick={() => updateTask("DELETED")}
              >
                Delete
              </button>
              {loading ? (
                <div id="spinner">
                  <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={50}
                    timeout={5000}
                    className="ms-3 mb-3"
                  />
                </div>
              ) : successMssg.length > 0 ? (
                <p style={{ color: "green" }} className="mt-3 ms-3">
                  {successMssg}
                </p>
              ) : (
                <p style={{ color: "red" }} className="mt-3 ms-3">
                  {errorMssg}
                </p>
              )}
            </div>
          </div>
          <div
            className="col-4 "
            style={{ backgroundColor: "#DBFDA6", minHeight: "100vh" }}
          >
            <div style={{ paddingTop: "70px" }}>
              <SideBar currentPage="displaytask" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
