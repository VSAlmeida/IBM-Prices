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
      { name: 'Sydney', code: 'syd', region: 'au-syd' },
      { name: 'Chennai', code: 'che', region: 'che01' },
      { name: 'Frankfurt', code: 'fra', region: 'eu-de' },
      { name: 'London', code: 'lon', region: 'eu-gb' },
      { name: 'Tokyo', code: 'tok', region: 'jp-tok' },
      { name: 'Oslo', code: 'osl', region: 'osl01' },
      { name: 'Seoul', code: 'seo', region: 'seo01' },
      { name: 'Washington DC', code: 'wdc', region: 'us-east' },
      { name: 'Dallas', code: 'dal', region: 'us-south' },
    ];
  },
};
