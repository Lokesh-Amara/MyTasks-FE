import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
import Navbar from "./NavBar";
import SideBar from "../components/SideBar";

export default function Home() {
  const history = useHistory();
  // const url = "http://localhost:3001";
  const url = "https://mytasks-be.herokuapp.com";
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  var taskList = [];

  useEffect(() => {
    const date = new Date();
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    const formatedDate = `${mm}/${dd}/${yyyy}`;

    setLoading(true);
    fetch(`${url}/gettasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        executiondate: formatedDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "success") {
          for (const v of data.result) {
            taskList.push(<TaskBox data={v} key={v.taskId} />);
          }
          setMyTasks(taskList);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const TaskBox = (props) => {
    return (
      <div
        className="taskBox  ms-5 mt-3"
        id="taskbox"
        style={{}}
        onClick={() => {
          history.push({
            pathname: "/displaytask",
            state: {
              data: props.data,
            },
          });
        }}
      >
        <h3 className="mt-2 ms-1">{props.data.heading}</h3>
        <p className="mt-4 ms-3">
          Notes : {props.data.notes.toString().slice(0, 20)}...
        </p>
        <span className="ms-3">Task type : {props.data.tasktype.type}</span>
        <br />

        <p className="ms-3" style={{ paddingTop: "15px" }}>
          status : {props.data.status}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="container-fluid" style={{ padding: "0px" }}>
        <Navbar />
        <div className="row" style={{ margin: "0px" }}>
          <div
            className="col-8"
            style={{ backgroundColor: "#F9EBF6", minHeight: "100vh" }}
          >
            <div style={{ paddingTop: "70px" }}>
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
              ) : (
                myTasks
              )}
            </div>
          </div>
          <div
            className="col-4 "
            style={{ backgroundColor: "#DBFDA6", minHeight: "100vh" }}
          >
            <div style={{ paddingTop: "70px" }}>
              <SideBar currentPage="home" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
