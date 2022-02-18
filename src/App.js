import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import "./styles.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}
