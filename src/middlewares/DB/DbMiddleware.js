const DbHelper = require('../../helpers/DB/DbHelper');
const EnterprisedbHelper = require('../../helpers/DB/EnterprisedbHelper');
const PostgreHelper = require('../../helpers/DB/PostgreHelper');
const Db2Helper = require('../../helpers/DB/Db2Helper');

//Função responsável por criar todas as possíveis combinações de flavores para PostgreSQL e EnterpriseDB
//Essa função espera receber o "options", objeto com todas as opções de vcpu/ram/disco
//E o "dbName", nome do banco de dados
function setCommunFlavor(options, dbName) {
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
        json.instanceFamily = 'Databases for ' + dbName;
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

function setDb2Flavors(options, instances, databaseEdition) {
  let data = [];
  options.flavor.forEach((flavorElement) => {
    for (
      let currentStorage = options.storageMin;
      currentStorage <= options.storageMax;
      currentStorage += 20
    ) {
      let json = DbHelper.defaultJson();
      json.priceDescription =
        'Db2 with ' +
        instances +
        ' instance with ' +
        flavorElement.description +
        ', ' +
        currentStorage +
        '/GB Disk';
      json.instances = instances;
      json.currentGeneration = 'Yes';
      json.instanceFamily = 'Databases for Db2';
      json.vCPU = flavorElement.vCpu;
      json.memory = flavorElement.ram;
      json.instanceType = json.vCPU + 'x' + json.memory;
      json.storage = currentStorage;
      json.databaseEngine = 'Db2';
      json.databaseEdition = databaseEdition;
      json.licenseModel = 'License Included';
      data[data.length] = json;
    }
  });

  return data;
}

module.exports = {
  //Método responsável por setar os possiveis flavors dos bancos de dados
  async setOffering(req, res, next) {
    let edbFlavors = setCommunFlavor(
      EnterprisedbHelper.options(),
      'EnterpriseDB'
    );
    let postgreFlavors = setCommunFlavor(PostgreHelper.options(), 'PostgreSQL');
    let db2 = [];
    if (res.locals.db2StandardLocation != null)
      db2 = [
        ...setDb2Flavors(Db2Helper.standardOptions(), 1, 'standard'),
        ...setDb2Flavors(Db2Helper.standardOptions(), 3, 'standard'),
        ...setDb2Flavors(Db2Helper.enterpriseOptions(), 1, 'enterprise'),
        ...setDb2Flavors(Db2Helper.enterpriseOptions(), 3, 'enterprise'),
      ];
    res.locals.data = [...edbFlavors, ...postgreFlavors, ...db2];
    next();
  },
};
