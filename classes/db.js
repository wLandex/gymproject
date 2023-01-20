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

  updateOne(filters, change) {
    for (let [key, value] of Object.entries(filters)) {
      for (let [i, arrVal] of this.data.entries()) {
        if (arrVal[key] === value) {
          this.data[i] = Object.assign(this.data[i], change);
          return this.data[i];
        }
      }
    }
  }
}

module.exports = DB;
