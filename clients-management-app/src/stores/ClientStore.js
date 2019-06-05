import { observable, action } from "mobx";
import Client from "../model/Client";
import Helpers from "../assets/Helpers";
import { clientsAndCoursesRegisterStore } from "./ClientsAndCoursesRegisterStore";

class ClientStore {
  @observable clients = [];
  localClient = null;
  _helper = Helpers.genericHelper;

  getAllClients() {
    return [...this.clients];
  }

  getClientById(id) {
    return Object.assign({}, this.getClientRefById(id));
  }

  getClientRefById(id) {
    return Helpers.genericHelper.getItemInArrById(id, this.clients);
  }

  getClientsByIds(ids) {
    let result = [];
    ids.forEach(id => {
      result.push(this.getClientById(id));
    });

    return result;
  }

  @action getLocalClient() {
    return Object.assign({}, new Client({ local: true }));
  }

  @action createClient(client) {
    const newClient = new Client({ ...client });
    this.clients.push(newClient);
  }

  @action removeClient(id) {
    Helpers.genericHelper.removeFromArr(id, this.clients);
  }

  @action editClient(client) {
    let beforeEdit = this.getClientRefById(client.id);
    clientsAndCoursesRegisterStore.registerClientInCourses(
      beforeEdit.courses,
      client.courses,
      client.id
    );
    Object.assign(beforeEdit, client);

    return beforeEdit;
  }
}

const clientStore = new ClientStore();

(function() {
  clientStore.clients = [
    new Client({
      firstName: "Neri",
      lastName: "Merhav",
      courses: [1]
    }),
    new Client({
      firstName: "Reut",
      lastName: "Merhav",
      courses: [2]
    }),
    new Client({
      firstName: "Tal",
      lastName: "Farkash",
      courses: [3]
    }),
    new Client({
      firstName: "Mike",
      lastName: "Blitsh",
      courses: [1, 3]
    })
  ];
})();

export default clientStore;
