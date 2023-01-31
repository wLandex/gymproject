module.exports = {
  getMongoID: () => (Date.now()).toString(16).repeat(2) + "00",
}



