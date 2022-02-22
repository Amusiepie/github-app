import React, { Component, Fragment } from "react";

import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";

import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
// import About from "./components/pages/About";

export default class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get("https://api.github.com/users");

  //   this.setState({ users: res.data, loading: false });
  // }

  //search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );

    this.setState({ user: res.data, loading: false });
  };

  //Get user from state
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}`);

    this.setState({ users: res.data.items, loading: false });
  };

  //clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //set an alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />

          <Search
            showClear={users.length > 0 ? true : false}
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}
