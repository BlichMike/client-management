import React, { Component } from "react";
import Calendar from "react-calendar";
import courseStore from "../../../stores/CourseStore";

class CalendarItem extends Component {
  constructor(props) {
    super(props);
    this.showCalendar = false;
    this.state = { showCalendar: false };
  }
  toggleCalendar = event => {
    event.preventDefault();
    let showCalendar = !this.state.showCalendar;
    this.setState({ showCalendar });
  };

  render() {
    return (
      <div>
        <div className="input-group mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Course Start Date
            </span>
          </div>
          <input
            type="text"
            className="form-control "
            id="courseTypeInput"
            placeholder="Enter the Course Type"
            value={courseStore.getDate(this.props.startDate) + " "}
            disabled
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              onClick={this.toggleCalendar}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="row ">
          <div className="col-2" />
          <div className="col-8 ">
            <Calendar
              value={this.props.startDate}
              onChange={this.props.onChangeHandler}
              className={this.state.showCalendar === false ? "d-none" : "mb-4"}
            />
          </div>
          <div className="col-2" />
          <div />
        </div>
      </div>
    );
  }
}

export default CalendarItem;
