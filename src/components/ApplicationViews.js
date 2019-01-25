import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";

export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: [],
    owners:[]
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
  deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(response => response.json())
      .then(owners =>
        this.setState({
            owners: owners
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
      .then(() =>fetch ("http://localhost:5002/owners")
      .then(r => r.json())
      .then(owners => this.setState({owners : owners})))
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
        <Route exact path="/owners" render={props => {
            return <OwnerList deleteOwner={this.deleteOwner} owners={this.state.owners} />;
          }}
        />
      </React.Fragment>
    );
  }
}