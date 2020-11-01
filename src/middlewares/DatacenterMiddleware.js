const DataCenterHelpers = require('../helpers/DataCenterHelpers');

module.exports = {
  async verifyDT(req, res, next) {
    const dt = DataCenterHelpers.getDTS;
    let parmOk = false;
    dt.forEach((e) => {
      if (req.query.location === e.code) {
        res.locals.groupId = e.groupId;
        res.locals.public = [];
        res.locals.reserved = [];
        parmOk = true;
      }
    });
    if (parmOk) {
      next();
    } else {
      res.status(406).send({
        error:
          'parametro invalido ou nao definido, porfavor adicione ?location=code no final da url',
        datacenters: dt,
      });
    }
  },
};
