import React, { useState } from "react";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";

export default function SideBar(props) {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());

  const getConcTasks = (x) => {
    var str = "";
    var today = new Date();
    if (x === "yesterday") today.setDate(today.getDate() - 1);
    else if (x === "tomorrow") today.setDate(today.getDate() + 1);
    else if (x === "EVERYDAY") str = "EVERYDAY";
    else if (x === "WEEKLY") str = "WEEKLY";
    else if (x === "MONTHLY") str = "MONTHLY";
    else if (x === "YEARLY") str = "YEARLY";
    else {
    }

    if (x === "yesterday" || x === "tomorrow") {
      history.push({
        pathname: "/displayTasks",
        state: {
          data: {
            type: "date",
            date: today,
          },
        },
      });
    } else {
      history.push({
        pathname: "/displayTasks",
        state: {
          data: {
            type: "periodic",
            str: str,
          },
        },
      });
    }
  };

  return (
    <div style={{ position: "fixed" }}>
      {props.currentPage !== "home" ? (
        <div>
          <button
            className="btn "
            id="sideButtons"
            onClick={() => history.push("/")}
          >
            Home
          </button>
          <br />
        </div>
      ) : (
        ""
      )}
      {props.currentPage !== "createtask" ? (
        <div>
          <button
            className="btn "
            id="sideButtons"
            onClick={() => history.push("/createtask")}
          >
            Create Task
          </button>
          <br />
        </div>
      ) : (
        ""
      )}
      {props.currentPage !== "displaytasks" ? (
        <div>
          <div className="mt-2">
            <DatePicker
              className="ms-2"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <button
              className="btn "
              id="sideButtons"
              onClick={() =>
                history.push({
                  pathname: "/displayTasks",
                  state: {
                    data: {
                      type: "date",
                      date: startDate,
                    },
                  },
                })
              }
            >
              Get Tasks
            </button>
            <br />
          </div>
          <button
            className="btn  mt-3"
            id="sideButtons"
            onClick={() => getConcTasks("yesterday")}
          >
            Yesterday's tasks
          </button>
          <br />
          <button
            className="btn  mt-3"
            id="sideButtons"
            onClick={() => getConcTasks("tomorrow")}
          >
            Tomorrow's tasks
          </button>
          <br />
          <button
            className="btn  mt-3"
            id="sideButtons"
            onClick={() => getConcTasks("EVERYDAY")}
          >
            Daily tasks
          </button>
          <br />
          <button
            className="btn  mt-3"
            id="sideButtons"
            onClick={() => getConcTasks("WEEKLY")}
          >
            Weekly tasks
          </button>
          <br />
          <button
            className="btn  mt-3"
            id="sideButtons"
            onClick={() => getConcTasks("MONTHLY")}
          >
            Monthly tasks
          </button>
          <br />
          <button
            className="btn  mt-3"
            id="sideButtons"
            onClick={() => getConcTasks("YEARLY")}
          >
            Yearly tasks
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
