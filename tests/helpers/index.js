module.exports = {
  getMongoID: () => (Date.now()).toString(16).repeat(2) + (10 + Math.trunc(Math.random() * 89)),
}




