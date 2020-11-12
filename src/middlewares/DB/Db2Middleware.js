const api = require('../../../config/gcApi');

module.exports = {
  //Método responsável por setar o preço dos flavors de Db2 Standard
  async setStandardPrice(req, res, next) {
    if (res.locals.db2StandardLocation != null)
      api
        .get('/dashDBStandard:' + res.locals.db2StandardLocation + '/pricing')
        .then((result) => {
          let data = res.locals.data;
          let instancePrice = 0;
          let vcpuPrice = 0;
          let diskPrice = 0;
          let backupPrice = 0;
          let endpointPrice = 0;
          //O preço base do Db2 é formado pela soma da quantidade de instancias, vCpu, disco, backup e service endpoint
          //Primeiro vamos percorrer a resposta da api e armazenar o valor destes componentes
          result.data.metrics.forEach((resultElement) => {
            switch (resultElement.resource_display_name) {
              //Armazenamos o valor do Instancia
              case 'INSTANCE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    instancePrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor da unidade de vCPU
              case 'VIRTUAL_PROCESSOR_CORE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    vcpuPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor do GB-Disco
              case 'GIGABYTE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    diskPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor do Backup
              case 'BACKUP_GIGABYTE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    backupPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor da Instancia
              case 'SERVICEENDPOINT_INSTANCE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    endpointPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
            }
          });
          //Com os preços armazenamos, vamos percorrer a array data
          //Onde estão todos os objetos com os flavors do Db2
          data.forEach((dataElement) => {
            if (
              dataElement.databaseEngine === 'Db2' &&
              dataElement.databaseEdition === 'standard'
            ) {
              dataElement.priceDescription += ', 1 Service Endpoint';
              dataElement.pricePerUnit =
                dataElement.vCPU * vcpuPrice +
                dataElement.instances * instancePrice +
                endpointPrice;
              dataElement.diskPrice = dataElement.storage * diskPrice;
              dataElement.location = req.query.location;
              delete dataElement['instances'];
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
    else next();
  },

  //Método responsável por setar o preço dos flavors de Db2 Enterprise
  async setEnterprisePrice(req, res, next) {
    if (res.locals.db2StandardLocation != null)
      api
        .get('/dashDBNebula:' + res.locals.db2EnterpriseLocation + '/pricing')
        .then((result) => {
          let data = res.locals.data;
          let instancePrice = 0;
          let vcpuPrice = 0;
          let diskPrice = 0;
          let backupPrice = 0;
          let endpointPrice = 0;
          //O preço base do Db2 é formado pela soma da quantidade de instancias, vCpu, disco, backup e service endpoint
          //Primeiro vamos percorrer a resposta da api e armazenar o valor destes componentes
          result.data.metrics.forEach((resultElement) => {
            switch (resultElement.resource_display_name) {
              //Armazenamos o valor do Instancia
              case 'INSTANCE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    instancePrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor da unidade de vCPU
              case 'VIRTUAL_PROCESSOR_CORE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    vcpuPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor do GB-Disco
              case 'GIGABYTE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    diskPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor do Backup
              case 'BACKUP_GIGABYTE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    backupPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
              //Armazenamos o valor da Instancia
              case 'SERVICEENDPOINT_INSTANCE_HOURS':
                resultElement.amounts.forEach((amountElement) => {
                  if (amountElement.country === 'USA') {
                    endpointPrice =
                      amountElement.prices[0].price /
                      resultElement.charge_unit_quantity;
                  }
                });
                break;
            }
          });
          //Com os preços armazenamos, vamos percorrer a array data
          //Onde estão todos os objetos com os flavors do Db2
          data.forEach((dataElement) => {
            if (
              dataElement.databaseEngine === 'Db2' &&
              dataElement.databaseEdition === 'enterprise'
            ) {
              dataElement.priceDescription += ', 1 Service Endpoint';
              dataElement.pricePerUnit =
                dataElement.vCPU * vcpuPrice +
                dataElement.instances * instancePrice +
                endpointPrice;
              dataElement.diskPrice = dataElement.storage * diskPrice;
              dataElement.location = req.query.location;
              delete dataElement['instances'];
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
    else next();
  },
};
