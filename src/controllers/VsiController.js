const VsiHelper = require('../helpers/VSI/VsiHelper');

module.exports = {
  //Rota responsavel por retornar todos as VSIs com os preços
  async getAll(req, res) {
    let data = res.locals.data;
    console.log(data.length);
    res.send(data);
  },

  //Rota responsavel por retornar todas as localizações
  async getLocations(req, res) {
    res.send({ data: VsiHelper.getLocations() });
  },
};
