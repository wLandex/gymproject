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
  find(filter) {
    return this.data.filter((record) => {
      return Object.keys(filter).some((key) => {
        return record[key] === filter[key];
      });
    });
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
  getTaskByID(id) {
    return timeTableDb.find({ id });
  }
}

let ann = new timetable("Anya");

const id1 = ann.addTask({ name: "Занятиe в зале", description: "3 по 15" });
const id2 = ann.addTask({ name: "Занятие на улице", description: "Бег" });
// console.log(ann.getTasks());
console.log(id1, id2);

console.log(ann.getTasks({ description: "3 по 15" }));
