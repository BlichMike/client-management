import React, { Component } from "react";
import CalendarItem from "./CalendarItem";
import { toast } from "react-toastify";
import MultiSelect from "@kenshooui/react-multi-select";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

@inject("ClientStore", "CourseStore")
@observer
class CoursePage extends Component {
  @observable course = null;

  constructor(props) {
    super(props);
    this.initData();
  }

  initData() {
    this.ClientStore = this.props.ClientStore;
    this.CourseStore = this.props.CourseStore;

    // isNew used to figure if this is a new item or existing (affects saving and initialization )
    this.isNew = false;

    if (this.props.match.params.id === "new") {
      this.isNew = true;
      this.course = this.CourseStore.getLocalCourse();
    } else {
      this.course = this.CourseStore.getCourseById(
        parseInt(this.props.match.params.id)
      );
    }

    return this.initCourses(this.course);
  }

  initCourses(course) {
    let allClients = this.ClientStore.getAllClients(),
      registeredClients = [];
    this.clientsForMultiSelect = [];
    this.selectedClientsForMultiSelect = [];

    if (course.registered.length > 0) {
      registeredClients = this.ClientStore.getClientsByIds(course.registered);

      this.selectedClientsForMultiSelect = this.courseToMultiSelectCourse(
        registeredClients
      );
    }

    this.clientsForMultiSelect = this.courseToMultiSelectCourse(allClients);
  }

  courseToMultiSelectCourse(clients) {
    return clients.map(client => {
      return {
        label: `${client.firstName} ${client.lastName}`,
        id: client.id
      };
    });
  }

  handleSelectClientChange = selectedClientsForMultiSelect => {
    this.selectedClientsForMultiSelect = selectedClientsForMultiSelect;
  };

  handleChange = (param, event) => {
    if (param === "startDate") {
      this.course.startDate = event;
    } else {
      this.course[param] = event.target.value;
    }
  };

  notify = text => toast(text, { type: toast.TYPE.SUCCESS });

  save = (course, event) => {
    event.preventDefault();
    let message = "";
    course.registered = this.selectedClientsForMultiSelect.map(
      client => client.id
    );

    if (this.isNew) {
      this.CourseStore.createCourse(course);
      message += `${course.name} created [${course.id}]`;
    } else {
      this.CourseStore.editCourse(course);
      message += `${course.name} edited [${course.id}]`;
    }
    this.props.history.push("/courses");
    this.notify(message);
  };

  render() {
    return (
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <form className="border p-5">
              <p className="h4 mb-4">Edit Course</p>

              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Course Name
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control "
                  id="courseNameInput"
                  placeholder="Enter the Course Name"
                  value={this.course.name}
                  onChange={event => this.handleChange("name", event)}
                />
              </div>
              <MultiSelect
                items={this.clientsForMultiSelect}
                selectedItems={this.selectedClientsForMultiSelect}
                onChange={this.handleSelectClientChange}
              />

              <CalendarItem
                startDate={this.course.startDate}
                onChangeHandler={event => this.handleChange("startDate", event)}
              />

              <button
                type="submit"
                className="btn btn-info btn-block"
                onClick={event => this.save(this.course, event)}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-2" />
        </div>
      </div>
    );
  }
}

export default CoursePage;
