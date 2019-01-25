import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import EmployeeList from "./employee/EmployeeList";

export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: []
  };

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(response => response.json())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  };

  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/employees`))
      .then(response => response.json())
      .then(employees =>
        this.setState({
            employees: employees
        })
      );
  };

  componentDidMount() {

    fetch("http://localhost:5002/animals")
      .then(r => r.json())
      .then(animals => this.setState({animals : animals}))
      .then(() =>fetch ("http://localhost:5002/employees")
      .then(r => r.json())
      .then(employees => this.setState({employees : employees})))
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/animals" render={props => {
            return ( <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
            );
          }}
        />
        <Route exact path="/employees" render={props => {
            return <EmployeeList deleteEmployee={this.deleteEmployee} employees={this.state.employees} />;
          }}
        />
      </React.Fragment>
    );
  }
}