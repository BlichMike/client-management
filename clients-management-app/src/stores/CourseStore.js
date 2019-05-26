import { observable, action } from "mobx";
import Course from "../model/Course/Course";
import Helpers from "../assets/Helpers";
import COURSE_ENUM from "../model/Course/CourseEnum";
import { clientsAndCoursesRegisterStore } from "./ClientsAndCoursesRegisterStore";

class CourseStore {
  @observable courses = [];
  @observable localCourse = null;

  getDate(date) {
    return Helpers.genericHelper.getDate(date);
  }

  getAllCourses() {
    return [...this.courses];
  }

  getCourseById(id) {
    return Object.assign({}, this.getCourseRefById(id));
  }

  getCourseRefById(id) {
    return Helpers.genericHelper.getItemInArrById(id, this.courses);
  }

  getCoursesByIds(ids) {
    let result = [];
    ids.forEach(id => {
      result.push(this.getCourseById(id));
    });

    return result;
  }

  getLocalCourse() {
    this.initLocalCourse();
    return this.localCourse;
  }

  @action initLocalCourse() {
    this.localCourse = new Course({ local: true });
  }

  @action addCourse(course) {
    this.courses.push(course);
  }

  @action removeCourse(id) {
    Helpers.genericHelper.removeFromArr(id, this.courses);
  }

  @action editCourse(course) {
    let beforeEdit = this.getCourseRefById(course.id);
    console.log(clientsAndCoursesRegisterStore);
    clientsAndCoursesRegisterStore.registerCourseInClients(
      beforeEdit.registered,
      course.registered,
      course.id
    );
    Object.assign(beforeEdit, course);

    return beforeEdit;
  }
}

const courseStore = new CourseStore();

(function() {
  courseStore.courses = [
    new Course({
      startDate: new Date(),
      registered: [],
      syllabus: [],
      type: COURSE_ENUM.ON_GOING.type,
      level: 1
    }),
    new Course({
      startDate: new Date(),
      registered: [],
      syllabus: [],
      type: COURSE_ENUM.OIL.type,
      level: 1
    }),
    new Course({
      startDate: new Date(),
      registered: [],
      syllabus: [],
      type: COURSE_ENUM.SKETCH.type,
      level: 2
    }),
    new Course({
      startDate: new Date(),
      registered: [],
      syllabus: [],
      type: COURSE_ENUM.OIL.type,
      level: 2
    })
  ];
})();

export default courseStore;
