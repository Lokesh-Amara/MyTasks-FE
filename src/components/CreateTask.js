import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import DatePicker from "react-datepicker";
import Navbar from "./NavBar";
import SideBar from "./SideBar";

import "react-datepicker/dist/react-datepicker.css";

export default function CreateTask() {
  const [startDate, setStartDate] = useState("");
  const [executionDate, setExecutionDate] = useState("none");
  // const url = "http://localhost:3001";
  const url = "https://mytasks-be.herokuapp.com";

  const [loading, setLoading] = useState(false);

  const formatDate = (x) => {
    if (x !== "") {
      var dd = String(x.getDate()).padStart(2, "0");
      var mm = String(x.getMonth() + 1).padStart(2, "0");
      var yyyy = x.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    } else return "none";
  };

  useEffect(() => {
    setExecutionDate(formatDate(startDate));
  }, [startDate]);

  var today = formatDate(new Date());

  const [heading, setHeading] = useState("");
  const [taskType, setTaskType] = useState("");
  const [weekday, setWeekday] = useState("none");
  const [monthlyDate, setMonthlyDate] = useState("none");
  const [yearlyDay, setYearlyDay] = useState("none");
  const [yearlyMonth, setYearlyMonth] = useState("none");
  const [notes, setNotes] = useState("");
  const status = "pending";

  const [onetimeCheck, setOnetimeCheck] = useState(false);
  const [periodicCheck, setPeriodicCheck] = useState(false);
  const [weekDayCheck, setWeekDayCheck] = useState(false);
  const [monthlyCheck, setMonthlyCheck] = useState(false);
  const [yearlyCheck, setYearlyCheck] = useState(false);

  const [validationMessage, setValidationMessage] = useState("");
  const [createdMssg, setCreatedMssg] = useState("");

  const handleCheck = (type) => {
    setWeekDayCheck(false);
    setMonthlyCheck(false);
    setYearlyCheck(false);
    if (type === "WEEKLY") setWeekDayCheck(true);
    else if (type === "MONTHLY") setMonthlyCheck(true);
    else if (type === "YEARLY") setYearlyCheck(true);
    else {
    }
  };

  const createTask = () => {
    setValidationMessage("");
    setCreatedMssg("");
    if (heading === "") {
      setValidationMessage("Please enter a heading for the Task!");
      return;
    } else {
    }

    if (taskType === "") {
      setValidationMessage("Please select a tasktype!");
      return;
    } else if (taskType === "ONE-TIME") {
      if (startDate === "") {
        setValidationMessage("Please select a date for the task!");
        return;
      }
    } else if (taskType === "PERIODIC") {
      setValidationMessage("Please select a frequency for the task!");
      return;
    } else if (taskType === "WEEKLY") {
      if (weekday === "none") {
        setValidationMessage("Please select weekday!");
        return;
      }
    } else if (taskType === "MONTHLY") {
      if (monthlyDate === "none") {
        setValidationMessage("Please select monthly date!");
        return;
      }
    } else if (taskType === "YEARLY") {
      if (yearlyDay === "none" || yearlyMonth === "none") {
        setValidationMessage("Please select date and month!");
        return;
      }
    } else {
    }

    if (notes === "") {
      setValidationMessage("Please provide notes for the task!");
      return;
    }

    setLoading(true);
    fetch(`${url}/createtask`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        heading: heading,
        creationdate: today,
        executiondate: executionDate,
        notes: notes,
        status: "PENDING",
        tasktype: taskType,
        weekday: weekday,
        dateofmonth: monthlyDate,
        dateofyear: `${yearlyMonth}/${yearlyDay}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setLoading(false);
          setCreatedMssg("Task created");
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
              <div className="ms-5">
                <h1>Create Task</h1>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-3"
                  >
                    Heading
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    style={{ width: "60%" }}
                    onChange={(e) => setHeading(e.target.value)}
                  />
                </div>
                <div>
                  Task type
                  <div className="form-check form-check-inline ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onClick={() => {
                        setPeriodicCheck(false);
                        setOnetimeCheck(true);
                        setTaskType("ONE-TIME");
                        handleCheck("");
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Once
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      onClick={() => {
                        setOnetimeCheck(false);
                        setPeriodicCheck(true);
                        setTaskType("PERIODIC");
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Periodic
                    </label>
                  </div>
                </div>
                {onetimeCheck ? (
                  <div className="mt-3">
                    <p style={{ display: "inline-block" }}>Select date</p>
                    <DatePicker
                      className="ms-3"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                ) : (
                  ""
                )}
                {periodicCheck ? (
                  <div className="mt-3">
                    <span>Frequency : </span>
                    <div className="form-check form-check-inline ms-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault3"
                        onClick={() => {
                          setTaskType("EVERYDAY");
                          handleCheck("EVERYDAY");
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Everyday
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault4"
                        onClick={() => {
                          setTaskType("WEEKLY");
                          handleCheck("WEEKLY");
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault4"
                      >
                        Weekly
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault5"
                        onClick={() => {
                          setTaskType("MONTHLY");
                          handleCheck("MONTHLY");
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault5"
                      >
                        Monthly
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault6"
                        onClick={() => {
                          setTaskType("YEARLY");
                          handleCheck("YEARLY");
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault6"
                      >
                        Yearly
                      </label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {weekDayCheck ? (
                  <div className="mt-3">
                    <p style={{ display: "inline-block" }}>Select weekday : </p>

                    <select
                      className="form-select d-inline-block ms-3"
                      style={{ width: "150px" }}
                      id="select_weekday"
                      onChange={(e) => {
                        setWeekday(e.target.value);
                      }}
                    >
                      <option value="none">Select</option>
                      <option value="SUNDAY">Sunday</option>
                      <option value="MONDAY">Monday</option>
                      <option value="TUESDAY">Tuesday</option>
                      <option value="WEDNESDAY">Wednesday</option>
                      <option value="THURSDAY">Thursday</option>
                      <option value="FRIDAY">Friday</option>
                      <option value="SATURDAY">Saturday</option>
                    </select>
                  </div>
                ) : (
                  ""
                )}
                {monthlyCheck ? (
                  <div className="mt-3">
                    <p style={{ display: "inline-block" }}>Date of Month : </p>

                    <select
                      className="form-select d-inline-block ms-3 form-select-sm"
                      style={{ width: "70px" }}
                      id="select_monthDay"
                      onChange={(e) => {
                        setMonthlyDate(e.target.value);
                      }}
                    >
                      <option value="none">Day</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>{" "}
                      <option value="04">04</option>{" "}
                      <option value="05">05</option>{" "}
                      <option value="06">06</option>{" "}
                      <option value="07">07</option>{" "}
                      <option value="08">08</option>{" "}
                      <option value="09">09</option>{" "}
                      <option value="10">10</option>{" "}
                      <option value="11">11</option>{" "}
                      <option value="12">12</option>{" "}
                      <option value="13">13</option>{" "}
                      <option value="14">14</option>{" "}
                      <option value="15">15</option>{" "}
                      <option value="16">16</option>{" "}
                      <option value="17">17</option>{" "}
                      <option value="18">18</option>{" "}
                      <option value="19">19</option>{" "}
                      <option value="20">20</option>{" "}
                      <option value="21">21</option>{" "}
                      <option value="22">22</option>{" "}
                      <option value="23">23</option>{" "}
                      <option value="24">24</option>{" "}
                      <option value="25">25</option>{" "}
                      <option value="26">26</option>{" "}
                      <option value="27">27</option>{" "}
                      <option value="28">28</option>{" "}
                      <option value="29">29</option>{" "}
                      <option value="30">30</option>{" "}
                      <option value="31">31</option>
                    </select>
                  </div>
                ) : (
                  ""
                )}
                {yearlyCheck ? (
                  <div className="mt-3">
                    <p style={{ display: "inline-block" }}>Day : </p>

                    <select
                      className="form-select d-inline-block ms-3 form-select-sm"
                      style={{ width: "70px" }}
                      id="select_YearDay"
                      onChange={(e) => {
                        setYearlyDay(e.target.value);
                      }}
                    >
                      <option value="none">Day</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>{" "}
                      <option value="04">04</option>{" "}
                      <option value="05">05</option>{" "}
                      <option value="06">06</option>{" "}
                      <option value="07">07</option>{" "}
                      <option value="08">08</option>{" "}
                      <option value="09">09</option>{" "}
                      <option value="10">10</option>{" "}
                      <option value="11">11</option>{" "}
                      <option value="12">12</option>{" "}
                      <option value="13">13</option>{" "}
                      <option value="14">14</option>{" "}
                      <option value="15">15</option>{" "}
                      <option value="16">16</option>{" "}
                      <option value="17">17</option>{" "}
                      <option value="18">18</option>{" "}
                      <option value="19">19</option>{" "}
                      <option value="20">20</option>{" "}
                      <option value="21">21</option>{" "}
                      <option value="22">22</option>{" "}
                      <option value="23">23</option>{" "}
                      <option value="24">24</option>{" "}
                      <option value="25">25</option>{" "}
                      <option value="26">26</option>{" "}
                      <option value="27">27</option>{" "}
                      <option value="28">28</option>{" "}
                      <option value="29">29</option>{" "}
                      <option value="30">30</option>{" "}
                      <option value="31">31</option>
                    </select>
                    <p style={{ display: "inline-block" }} className="ms-3">
                      Month :{" "}
                    </p>

                    <select
                      className="form-select d-inline-block ms-3 form-select-sm"
                      style={{ width: "100px" }}
                      id="select_YearMonth"
                      onChange={(e) => {
                        setYearlyMonth(e.target.value);
                      }}
                    >
                      <option value="none">Month</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>{" "}
                      <option value="04">April</option>{" "}
                      <option value="05">May</option>{" "}
                      <option value="06">June</option>{" "}
                      <option value="07">July</option>{" "}
                      <option value="08">August</option>{" "}
                      <option value="09">September</option>{" "}
                      <option value="10">October</option>{" "}
                      <option value="11">November</option>{" "}
                      <option value="12">December</option>{" "}
                    </select>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-floating mt-3">
                  <textarea
                    className="form-control"
                    placeholder=""
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "70%" }}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Notes</label>
                </div>
                <div className="">
                  <label htmlFor="taskCreatedOn" className="form-label mt-3">
                    Created on :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskCreatedOn"
                    style={{ width: "60%" }}
                    value={today}
                    readOnly
                  />
                </div>
                <div className="">
                  <label htmlFor="taskStatus" className="form-label mt-3">
                    Status :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskStatus"
                    style={{ width: "60%" }}
                    value={status}
                    readOnly
                  />
                </div>
                <button
                  className="btn btn-success mt-3"
                  onClick={() => createTask()}
                >
                  Create{" "}
                </button>
                {loading ? (
                  <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={50}
                    timeout={5000}
                    className="ms-3 mb-3"
                  />
                ) : (
                  <span
                    style={{
                      color: "green",
                      position: "relative",
                      top: "10px",
                    }}
                    className="ms-3"
                  >
                    {createdMssg}
                  </span>
                )}
                <p style={{ color: "red" }} className="mb-5">
                  {validationMessage}
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-4 "
            style={{ backgroundColor: "#DBFDA6", minHeight: "100vh" }}
          >
            <div style={{ paddingTop: "70px" }}>
              <SideBar currentPage="createtask" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
