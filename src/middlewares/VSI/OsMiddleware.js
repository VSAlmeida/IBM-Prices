const VsiHelper = require('../../helpers/VsiHelper');

module.exports = {
  async setOS(req, res, next) {
    let data = res.locals.data;
    let dataOS = [];
    data.forEach((e) => {
      if (e.storage === '25GB SAN' || e.storage === '100GB SSD') {
        let json = VsiHelper.newJson(e);
        json.priceDescription += ', Operating System Ubuntu';
        json.operatingSystem = { shortName: 'Ubuntu', version: [] };
        dataOS[dataOS.length] = json;
      }
    });

    data.forEach((e) => {
      if (e.storage === '25GB SAN' || e.storage === '100GB SSD') {
        let json = VsiHelper.newJson(e);
        json.priceDescription += ', Operating System CentOS';
        json.operatingSystem = { shortName: 'CentOS', version: [] };
        dataOS[dataOS.length] = json;
      }
    });

    data.forEach((e) => {
      if (e.storage === '25GB SAN' || e.storage === '100GB SSD') {
        let json = VsiHelper.newJson(e);
        json.priceDescription += ', Operating System Debian';
        json.operatingSystem = { shortName: 'Debian', version: [] };
        dataOS[dataOS.length] = json;
      }
    });

    data.forEach((e) => {
      if (e.storage === '25GB SAN' || e.storage === '100GB SSD') {
        let json = VsiHelper.newJson(e);
        json.priceDescription += ', Operating System RHEL';
        json.operatingSystem = {
          shortName: 'Red Hat Enterprise Linux',
          version: [],
        };
        dataOS[dataOS.length] = json;
      }
    });

    data.forEach((e) => {
      if (e.storage === '100GB SAN' || e.storage === '100GB SSD') {
        let json = VsiHelper.newJson(e);
        json.priceDescription += ', Operating System Windows';
        json.operatingSystem = { shortName: 'Windows', version: [] };
        dataOS[dataOS.length] = json;
      }
    });
    res.locals.data = dataOS;
    next();
  },
};
