import { observable } from "mobx";

class Client {
  @observable firstName;
  @observable lastName;
  constructor({ firstName = "", lastName = "", courses = [], local = false }) {
    if (local === false) {
      this.id = Client.incrementId();
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.courses = courses;
    this._local = local;
  }

  static incrementId() {
    if (typeof this.latestId === "undefined") {
      this.latestId = 0;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }
}

export default Client;
