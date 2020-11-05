const DbHelper = require('../helpers/DB/DbHelper');

module.exports = {
  //Rota responsavel por retornar todos os DBs com os preços
  async getAll(req, res) {
    const data = res.locals.data;
    console.log(data.length);
    res.send({ data: data });
  },

  //Rota responsavel por retornar todas as localizações
  async getLocations(req, res) {
    res.send(DbHelper.getLocations());
  },
};
