import React from "react";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-light bg-light"
      style={{ position: "fixed", width: "100%", left: "0px" }}
    >
      <div className="container-fluid">
        <span
          className="navbar-brand  mb-0 h1 ms-5 "
          id="navbarHead"
          style={{ borderRadius: "4px" }}
        >
          MyTasks &nbsp;
        </span>
      </div>
    </nav>
  );
}
