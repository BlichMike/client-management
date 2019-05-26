import { clientsAndCoursesRegisterStore } from "../stores/ClientsAndCoursesRegisterStore";
import ClientsAndCoursesRegisterStore from "../stores/ClientsAndCoursesRegisterStore";
import ClientStore from "./ClientStore";
import CourseStore from "./CourseStore";

class RootStore {
  constructor() {
    this.ClientStore = ClientStore;
    this.CourseStore = CourseStore;
    this.ClientsAndCoursesRegisterStore = clientsAndCoursesRegisterStore;
    ClientsAndCoursesRegisterStore.init(ClientStore, CourseStore);
  }
}

export default new RootStore();
