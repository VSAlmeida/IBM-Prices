module.exports = {
  //Método para retonar schema do json padrão com as informações dos bancos de dados
  defaultJson() {
    return {
      termType: 'OnDemand',
      priceDescription: '',
      pricePerUnit: 0,
      leaseContractLength: '0yr',
      purchaseOption: 'No Upfront',
      offeringClass: 'Convertible',
      productFamily: 'Database',
      location: '',
      instanceType: '',
      currentGeneration: '',
      instanceFamily: '',
      vCPU: '',
      memory: '',
      storage: '',
      diskPrice: '',
      engineCode: '',
      databaseEngine: '',
      databaseEdition: '',
      licenseModel: '',
    };
  },

  //Método responsável por criar um novo objeto json com as informações correntes
  newJson(e) {
    return {
      termType: e.termType,
      priceDescription: e.priceDescription,
      pricePerUnit: e.pricePerUnit,
      leaseContractLength: e.leaseContractLength,
      purchaseOption: e.purchaseOption,
      offeringClass: e.offeringClass,
      productFamily: e.productFamily,
      location: e.location,
      instanceType: e.instanceType,
      currentGeneration: e.currentGeneration,
      instanceFamily: e.instanceFamily,
      vCPU: e.vCPU,
      memory: e.memory,
      storage: e.storage,
      diskPrice: e.diskPrice,
      engineCode: e.engineCode,
      databaseEngine: e.databaseEngine,
      databaseEdition: e.databaseEdition,
      licenseModel: e.licenseModel,
    };
  },

  //Método responsável por retornar todas as localizações onde podemos provisionar um banco de dados
  getLocations() {
    return [
      {
        name: 'Sydney',
        dbavailable: ['PostgreSQL', 'EnterpriseDB', 'Db2'],
        code: 'syd',
        region: 'au-syd',
        regionDb2Standard: 'au-syd84796',
        regionDb2Enterprise: 'au-syd77001',
      },
      {
        name: 'Frankfurt',
        dbavailable: ['PostgreSQL', 'EnterpriseDB', 'Db2'],
        code: 'fra',
        region: 'eu-de',
        regionDb2Standard: 'eu-de98206',
        regionDb2Enterprise: 'eu-de60002',
      },
      {
        name: 'London',
        dbavailable: ['PostgreSQL', 'EnterpriseDB', 'Db2'],
        code: 'lon',
        region: 'eu-gb',
        regionDb2Standard: 'eu-gb53940',
        regionDb2Enterprise: 'eu-gb53953',
      },
      {
        name: 'Tokyo',
        dbavailable: ['PostgreSQL', 'EnterpriseDB', 'Db2'],
        code: 'tok',
        region: 'jp-tok',
        regionDb2Standard: 'jp-tok29556',
        regionDb2Enterprise: 'jp-tok36432',
      },
      {
        name: 'Washington DC',
        dbavailable: ['PostgreSQL', 'EnterpriseDB', 'Db2'],
        code: 'wdc',
        region: 'us-east',
        regionDb2Standard: 'us-east97877',
        regionDb2Enterprise: 'us-east40630',
      },
      {
        name: 'Dallas',
        dbavailable: ['PostgreSQL', 'EnterpriseDB', 'Db2'],
        code: 'dal',
        region: 'us-south',
        regionDb2Standard: 'us-south42981',
        regionDb2Enterprise: 'us-south48100',
      },
      {
        name: 'Chennai',
        dbavailable: ['PostgreSQL', 'EnterpriseDB'],
        code: 'che',
        region: 'che01',
        regionDb2Standard: null,
        regionDb2Enterprise: null,
      },
      {
        name: 'Oslo',
        dbavailable: ['PostgreSQL', 'EnterpriseDB'],
        code: 'osl',
        region: 'osl01',
        regionDb2Standard: null,
        regionDb2Enterprise: null,
      },
      {
        name: 'Seoul',
        dbavailable: ['PostgreSQL', 'EnterpriseDB'],
        code: 'seo',
        region: 'seo01',
        regionDb2Standard: null,
        regionDb2Enterprise: null,
      },
    ];
  },
};
