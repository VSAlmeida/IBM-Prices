const VsiHelper = require('../helpers/VSI/VsiHelper');
const DbHelper = require('../helpers/DB/DbHelper');

module.exports = {
  //Método responsável por verificar se a request esta com o parâmetro correto
  async verifyVSIParms(req, res, next) {
    const dt = VsiHelper.getLocations();
    let urlParms = false;
    dt.forEach((e) => {
      if (req.query.location === e.code) {
        res.locals.groupId = e.groupId;
        res.locals.public = [];
        res.locals.reserved = [];
        urlParms = true;
      }
    });
    if (!urlParms) {
      res.status(406).send({
        error:
          'parametro invalido ou nao definido, porfavor adicione ?location=code no final da url',
        datacenters: dt,
      });
    } else next();
  },

  //Método responsável por verificar se a request esta com o parâmetro correto
  async verifyDBParms(req, res, next) {
    const locations = DbHelper.getLocations();
    let urlParms = false;
    locations.forEach((locationElement) => {
      if (req.query.location === locationElement.code) {
        res.locals.location = locationElement.region;
        res.locals.db2StandardLocation = locationElement.regionDb2Standard;
        res.locals.db2EnterpriseLocation = locationElement.regionDb2Enterprise;
        urlParms = true;
      }
    });
    if (!urlParms) {
      res.status(406).send({
        error:
          'parametro invalido ou nao definido, porfavor adicione ?location=code no final da url',
        datacenters: locations,
      });
    } else next();
  },
};
