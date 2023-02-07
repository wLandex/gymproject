module.exports = {
  getMongoID: () => (Date.now()).toString(16).repeat(2) + (9 + Math.trunc(Math.random() * 70)),
}



