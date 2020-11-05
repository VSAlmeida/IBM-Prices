const DbHelper = require('../../helpers/DB/DbHelper');

module.exports = {
  //Método responsável por verificar se a request esta com o parâmetro correto
  async verifyParms(req, res, next) {
    const locations = DbHelper.getLocations();
    let parmOk = false;
    locations.forEach((locationElement) => {
      if (req.query.location === locationElement.code) {
        res.locals.location = locationElement.region;
        parmOk = true;
      }
    });
    if (parmOk) {
      next();
    } else {
      res.status(406).send({
        error:
          'parametro invalido ou nao definido, porfavor adicione ?location=code no final da url',
        datacenters: locations,
      });
    }
  },
};
