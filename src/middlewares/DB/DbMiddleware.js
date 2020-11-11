const DbHelper = require('../../helpers/DB/DbHelper');
const EnterprisedbHelper = require('../../helpers/DB/EnterprisedbHelper');
const PostgreHelper = require('../../helpers/DB/PostgreHelper');

//Função responsável por criar todas as possíveis combinações de flavores
//Essa função espera receber o "options", objeto com todas as opções de vcpu/ram/disco
//E o "dbName", nome do banco de dados
function setFlavor(options, dbName) {
  let data = [];
  options.cores.forEach((coreElement) => {
    options.ram.forEach((ramElement) => {
      options.disk.forEach((diskElement) => {
        let json = DbHelper.defaultJson();
        json.priceDescription =
          dbName +
          ' with ' +
          coreElement.description +
          ', ' +
          ramElement.description +
          ' (' +
          ramElement.value * coreElement.cores +
          ' GB Total), ' +
          diskElement.description +
          ' (' +
          diskElement.value * coreElement.cores +
          'GB Total)';
        json.currentGeneration = 'Yes';
        json.vCPU = coreElement.cores * 3;
        json.memory = ramElement.value * coreElement.cores;
        json.instanceType = json.vCPU + 'x' + json.memory;
        json.storage = diskElement.value * coreElement.cores;
        json.databaseEngine = dbName;
        json.licenseModel = 'License Included';
        data[data.length] = json;
      });
    });
  });
  return data;
}

module.exports = {
  //Método responsável por setar os possiveis flavors dos bancos de dados
  async setOffering(req, res, next) {
    const edbFlavors = setFlavor(EnterprisedbHelper.options(), 'EnterpriseDB');
    const postgreFlavors = setFlavor(PostgreHelper.options(), 'PostgreSQL');
    res.locals.data = [...edbFlavors, ...postgreFlavors];
    next();
  },
};
