const baseDB = [];

class DB {
  constructor() {
    this.data = [];
  }

  insert(obj) {
    obj["id"] = Math.trunc(Math.random() * 1000000000);
    this.data.push(obj);
    return obj["id"];
  }
  find(filter = {}) {
    if (Object.keys(filter).length === 0) return this.data;
    return this.data.filter((record) => {
      return Object.keys(filter).every((key) => {
        return record[key] === filter[key];
      });
    });
  }
  findOne(filter) {
    return this.find(filter)[0];
  }

  removeOne(filters) {
    for (let [key, value] of Object.entries(filters)) {
      for (let [i, arrVal] of this.data.entries()) {
        if (arrVal[key] === value) return this.data.splice(i, 1);
      }
    }
  }

  remove(filters) {
    for (let [key, value] of Object.entries(filters)) {
      for (let [i, arrVal] of this.data.entries()) {
        if (arrVal[key] === value) this.data.splice(i, 1);
      }
    }
  }
}

const timeTableDb = new DB();

class timetable {
  constructor(name) {
    this.name = name;
  }

  /**
   *
   * @param {
   *         name : string,
   *         description: string
   * } data
   */
  addTask(data) {
    return timeTableDb.insert(data);
  }
  getTasks(filter) {
    return timeTableDb.find(filter);
  }

  getTask(filter) {
    return timeTableDb.findOne(filter);
  }

  getTaskByID(id) {
    return timeTableDb.findOne({ id });
  }

  removeTaskById(id) {
    timeTableDb.removeOne({ id });
  }
  removeTasks(filter) {
    timeTableDb.remove(filter);
  }
}

let ann = new timetable("Anya");

const id1 = ann.addTask({ name: "Занятие в зале", description: "3 по 15" });
const id2 = ann.addTask({ name: "Занятие на улице", description: "Бег" });
const id3 = ann.addTask({ name: "Занятие в зале", description: "12 sdf" });
