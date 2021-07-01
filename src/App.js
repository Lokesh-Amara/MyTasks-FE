import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import DisplayTask from "./components/DisplayTask";
import CreateTask from "./components/CreateTask";
import DisplayTasks from "./components/DisplayTasks";

import "./App.css";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/displayTasks">
              <DisplayTasks />
            </Route>
            <Route path="/displaytask">
              <DisplayTask />
            </Route>
            <Route path="/createtask">
              <CreateTask />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
