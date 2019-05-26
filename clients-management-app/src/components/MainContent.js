import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CoursePage from "./coursesPages/coursePage/CoursePage";
import CoursesPage from "./coursesPages/CoursesPage";
import ClientPage from "./clientsPages/clientPage/ClientPage";
import ClientsPage from "./clientsPages/ClientsPage";
import HomePage from "./homePage/HomePage";
import { inject, observer } from "mobx-react";

@inject("ClientStore", "CourseStore", "RootStore")
@observer
class MainContent extends Component {
  render() {
    const { RootStore } = this.props;
    RootStore.ClientsAndCoursesRegisterStore.initRegisteration();

    return (
      <Switch>
        <Route path="/courses/:id" component={CoursePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/clients/:id" component={ClientPage} />
        <Route path="/clients" component={ClientsPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
  }
}

export default MainContent;
