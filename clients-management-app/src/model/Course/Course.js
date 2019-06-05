import COURSE_ENUM from "./CourseEnum";

class Course {
  constructor({
    startDate = new Date(),
    registered = [],
    type = COURSE_ENUM.ON_GOING.type,
    name,
    syllabus = [],
    level = 1,
    local = false
  }) {
    if (local === false) {
      this.id = Course.incrementId();
    }
    this.startDate = startDate;
    this.registered = registered;
    this.type = type;
    this.name = name || COURSE_ENUM[type].name;
    this.price = COURSE_ENUM[type].price;
    this.duration = COURSE_ENUM[type].duration;
    this.syllabus = syllabus;
    this.level = level;
  }

  static incrementId() {
    if (typeof this.latestId === "undefined") this.latestId = 0;
    else this.latestId++;
    return this.latestId;
  }
}

export default Course;
