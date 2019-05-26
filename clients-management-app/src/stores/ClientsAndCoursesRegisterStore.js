import Helpers from "../assets/Helpers";

export class ClientsAndCoursesRegisterStore {
  static init(ClientStore, CourseStore) {
    this._clientStore = ClientStore;
    this._courseStore = CourseStore;
  }

  initRegisteration() {
    ClientsAndCoursesRegisterStore._clientStore.clients.forEach(c =>
      this.registerClientInCourses([], c.courses, c.id)
    );
  }

  registerClientInCourses(original, updated, clientId) {
    let coursesToAddTo = [],
      coursesToRemoveFrom = [],
      courseStore = ClientsAndCoursesRegisterStore._courseStore;

    coursesToRemoveFrom = courseStore.getCoursesByIds(
      Helpers.genericHelper.getInSourceAndNotTarget(original, updated)
    );
    coursesToAddTo = courseStore.getCoursesByIds(
      Helpers.genericHelper.getInSourceAndNotTarget(updated, original)
    );

    // remove client from unregistered courses
    coursesToRemoveFrom.forEach(item =>
      item.registered.splice(item.registered.indexOf(clientId), 1)
    );

    // add client to registered courses
    coursesToAddTo.forEach(item => item.registered.push(clientId));
  }

  registerCourseInClients(original, updated, courseId) {
    let clientsToAddTo = [],
      clientsToRemoveFrom = [],
      clientStore = ClientsAndCoursesRegisterStore._clientStore;

    clientsToRemoveFrom = clientStore.getClientsByIds(
      Helpers.genericHelper.getInSourceAndNotTarget(original, updated)
    );
    clientsToAddTo = clientStore.getClientsByIds(
      Helpers.genericHelper.getInSourceAndNotTarget(updated, original)
    );

    // remove course from unregistered clients
    clientsToRemoveFrom.forEach(item =>
      item.courses.splice(item.courses.indexOf(courseId), 1)
    );

    // add course to registered clients
    clientsToAddTo.forEach(item => item.courses.push(courseId));
  }
}

export const clientsAndCoursesRegisterStore = new ClientsAndCoursesRegisterStore();
export default ClientsAndCoursesRegisterStore;
