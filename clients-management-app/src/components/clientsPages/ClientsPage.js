import React, { Component } from "react";
import { Link } from "react-router-dom";
import courseStore from "../../stores/CourseStore";
import clientStore from "../../stores/ClientStore";

class ClientsPage extends Component {
  state = {
    courses: courseStore.courses,
    clients: clientStore.clients
  };

  getCourses(courses) {
    let result = "",
      fullCourses = courses.map(course => {
        return courseStore.getCourseById(course);
      });

    fullCourses.forEach(course => {
      result +=
        course.name + " - " + courseStore.getDate(course.startDate) + " | ";
    });
    return result.substring(0, result.length - 2);
  }

  render() {
    return (
      <>
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Registered courses</th>
              <th scope="col">
                <div>
                  <Link to={{ pathname: "/clients/new" }}>
                    <button
                      className="btn btn-info"
                      type="submit"
                      onClick={this.createNewClient}
                    >
                      Create new client
                    </button>
                  </Link>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map(client => (
              <tr key={client.id}>
                <th>{client.firstName + " " + client.lastName}</th>
                <td>{this.getCourses(client.courses)}</td>
                <td>
                  <Link to={{ pathname: "/clients/" + client.id, client }}>
                    <button className="btn btn-link">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ClientsPage;
