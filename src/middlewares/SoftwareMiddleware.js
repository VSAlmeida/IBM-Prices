const GenericHelper = require('../helpers/GenericHelper')

module.exports = {
  async setSoftware(req, res, next) {
    let data = res.locals.data;
    let dataSoftware = []
    data.forEach(e => {
      let json = GenericHelper.newJson(e);
      json.preInstaledSoftware = "None"
      dataSoftware[dataSoftware.length] = json
    })

    data.forEach(e => {
      if (e.storage === "25GB SAN" || e.storage === "100GB SSD") {
        let json = GenericHelper.newJson(e);
        json.priceDescription += ", MySQL for Linux"
        json.preInstaledSoftware = { shortName: "MySQL for Linux", version: [] }
        dataSoftware[dataSoftware.length] = json
      }
    })

    data.forEach(e => {
      if (e.storage === "100GB SAN" || e.storage === "100GB SSD") {
        let json = GenericHelper.newJson(e);
        json.priceDescription += ", MySQL for Windows"
        json.preInstaledSoftware = { shortName: "MySQL for Windows", version: [] }
        dataSoftware[dataSoftware.length] = json
      }
    })
    res.locals.data = dataSoftware
    next();
  }
};
