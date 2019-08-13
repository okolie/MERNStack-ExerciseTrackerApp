import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link>|{" "}
      <button
        className="btn btn-primary"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }

  exerciseList = () => {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          key="exercise._id"
          deleteExercise={this.deleteExercise}
        />
      );
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(response => {
        this.setState({
          exercises: response.data
        });
      })
      .catch(error => console.log(error));
  }

  deleteExercise = id => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then(response => console.log(response.data));
    //   .catch(error => console.log(error));

    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
