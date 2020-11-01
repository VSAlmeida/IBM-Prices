const GenericHelper = require('../helpers/GenericHelper')

module.exports = {
  async setNetwork(req, res, next) {
    const public = res.locals.public;
    const reserved = res.locals.reserved;
    let data = [...public, ...reserved];
    let dataNetwork = []
    data.forEach(e => {
      let json = GenericHelper.newJson(e);
      json.priceDescription += ", 1 Gbps Public & Private Network Uplinks"
      json.networkPerformance = '1 Gbps Public & Private Network Uplinks'
      dataNetwork[dataNetwork.length] = json
    })

    data.forEach(e => {
      let json = GenericHelper.newJson(e);
      json.priceDescription += ", 100 Mbps Public & Private Network Uplinks"
      json.networkPerformance = '100 Mbps Public & Private Network Uplinks'
      dataNetwork[dataNetwork.length] = json
    })

    res.locals.data = dataNetwork
    next();
  }
};
