const api = require('../../../config/gcApi');

module.exports = {
  //Método responsável por setar o preço dos flavors de EnterpriseDB
  async setPrice(req, res, next) {
    api
      .get(
        '/databases-for-enterprisedb-standard:' +
          res.locals.location +
          '/pricing'
      )
      .then((result) => {
        let data = res.locals.data;
        let vcpuPrice = 0;
        let ramPrice = 0;
        let diskPrice = 0;
        //O preço do EnterpriseDB é formado pela soma da vCpu, ram e disco
        //Primeiro vamos percorrer a resposta da api e armazenar o valor destes componentes
        result.data.metrics.forEach((resultElement) => {
          switch (resultElement.resource_display_name) {
            //Armazenamos o valor da unidade de vCPU
            case 'VIRTUAL_PROCESSOR_CORES':
              resultElement.amounts.forEach((amountElement) => {
                if (amountElement.country === 'USA') {
                  vcpuPrice = amountElement.prices[0].price;
                }
              });
              break;
            //Armazenamos o valor do GB-Ram
            case 'GIGABYTE_MONTHS_RAM':
              resultElement.amounts.forEach((amountElement) => {
                if (amountElement.country === 'USA') {
                  ramPrice = amountElement.prices[0].price;
                }
              });
              break;
            //Armazenamos o valor do GB-Disco
            case 'GIGABYTE_MONTHS_DISK':
              resultElement.amounts.forEach((amountElement) => {
                if (amountElement.country === 'USA') {
                  diskPrice = amountElement.prices[0].price;
                }
              });
              break;
          }
        });
        //Com os preços armazenamos, vamos percorrer a array data
        //Onde estão todos os objetos com os flavors do EnterpriseDB
        data.forEach((dataElement) => {
          if (dataElement.databaseEngine === 'EnterpriseDB') {
            dataElement.pricePerUnit =
              dataElement.vCPU * vcpuPrice + dataElement.memory * ramPrice;
            dataElement.diskPrice = dataElement.storage * diskPrice;
            dataElement.databaseEdition = 'standard';
            dataElement.location = req.query.location;
          }
        });
        next();
      })
      .catch((err) => {
        const { message, code } = err.response.data;
        res
          .status(code)
          .send({ message: message, errorOrigin: 'ibm_global_catalog' });
      });
  },
};
