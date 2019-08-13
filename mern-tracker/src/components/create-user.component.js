import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  onChangeUsername = e => {
    this.setState({ username: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };

    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));

    console.log(user);
    this.setState({ username: "" });
  };

  render() {
    return (
      <div className="container">
        <h1>Create New User</h1>
        <form onSubmit={this.onSubmit}>
          <div className="class-group">
            <label>User</label>
            <input
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
              className="form-control mb-1"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
