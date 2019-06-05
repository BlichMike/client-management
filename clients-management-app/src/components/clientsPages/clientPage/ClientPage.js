import React, { Component } from "react";
import { toast } from "react-toastify";
import MultiSelect from "@kenshooui/react-multi-select";
import TextInput from "./TextInput";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

@inject("ClientStore", "CourseStore")
@observer
class ClientPage extends Component {
  @observable client = null;

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
      this.client = this.ClientStore.getLocalClient(this.props.match.params.id);
    } else {
      this.client = this.ClientStore.getClientById(
        parseInt(this.props.match.params.id)
      );
    }

    this.initCourses(this.client);
  }

  initCourses(client) {
    let allCourses = this.CourseStore.getAllCourses(),
      registeredCourses = [];
    this.coursesForMultiSelect = [];
    this.selectedCoursesForMultiSelect = [];

    if (client.courses.length > 0) {
      registeredCourses = this.CourseStore.getCoursesByIds(client.courses);

      this.selectedCoursesForMultiSelect = this.coursesToMultiSelectCourses(
        registeredCourses
      );
    }

    this.coursesForMultiSelect = this.coursesToMultiSelectCourses(allCourses);
  }

  coursesToMultiSelectCourses(courses) {
    return courses.map(course => {
      return {
        label: `${course.name} - ${this.CourseStore.getDate(course.startDate)}`,
        id: course.id
      };
    });
  }

  handleSelectCourseChange = selectedCoursesForMultiSelect => {
    this.selectedCoursesForMultiSelect = selectedCoursesForMultiSelect;
  };

  // handling the change of standard fields (inputs)
  handleChange = (param, event) => {
    this.client[param] = event.target.value;
  };

  // success toast :)
  notify = text => toast(text, { type: toast.TYPE.SUCCESS });

  // save handler
  save = (client, event) => {
    event.preventDefault();
    let message = "";
    client.courses = this.selectedCoursesForMultiSelect.map(
      course => course.id
    );

    this.ClientStore.editClient(client);

    if (this.isNew) {
      this.ClientStore.addClient(client);
      message += `${client.firstName} ${client.lastName} created`;
    } else {
      this.ClientStore.editClient(client);
      message += `${client.firstName} ${client.lastName} edited`;
    }
    this.props.history.push("/clients");
    this.notify(message);
  };

  render() {
    let textInputsData = {
      firstName: {
        inputText: "First Name",
        inputPlaceholder: "Enter Client First Name",
        inputValue: this.client.firstName,
        onChange: event => this.handleChange("firstName", event)
      },
      lastName: {
        inputText: "Last Name",
        inputPlaceholder: "Enter Client Last Name",
        inputValue: this.client.lastName,
        onChange: event => this.handleChange("lastName", event)
      }
    };

    return (
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <form className="border p-5">
              <p className="h4 mb-4">Edit Client</p>

              <TextInput {...textInputsData.firstName} />
              <TextInput {...textInputsData.lastName} />

              <MultiSelect
                items={this.coursesForMultiSelect}
                selectedItems={this.selectedCoursesForMultiSelect}
                onChange={this.handleSelectCourseChange}
              />

              <button
                type="submit"
                className="btn btn-info btn-block"
                onClick={event => this.save(this.client, event)}
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

export default ClientPage;
