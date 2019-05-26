import React, { Component } from "react";
import { Link } from "react-router-dom";
import courseStore from "../../stores/CourseStore";

class CoursesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: courseStore.courses
    };
  }

  render() {
    return (
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Course Price</th>
            <th scope="col">Course Duration</th>
            <th scope="col">Starting Date</th>
            <th scope="col">Number of registered</th>
            <th scope="col">Course Level</th>
            <th scope="col">
              <div>
                <Link to={{ pathname: "/courses/new" }}>
                  <button className="btn btn-info" type="submit">
                    Create new course
                  </button>
                </Link>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.courses.map(course => (
            <tr key={course.id}>
              <th>{course.name}</th>
              <th>₪{course.price}</th>
              <th>
                {course.duration + " day" + (course.duration > 1 ? "s" : "")}
              </th>
              <td>{courseStore.getDate(course.startDate)}</td>
              <td>{course.registered.length}</td>
              <td>{course.level}</td>
              <td>
                <Link to={{ pathname: "/courses/" + course.id, course }}>
                  <button className="btn btn-link">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default CoursesPage;
