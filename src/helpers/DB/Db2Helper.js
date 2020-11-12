module.exports = {
  //Método responsável por retornar todas as possíveis opções de flavors e disco do Db2
  standardOptions() {
    return {
      flavor: [
        {
          description: '2 Shared vCpus, 8 GB RAM',
          vCpu: 2,
          ram: 8,
        },
        {
          description: '4 Shared vCpus, 16 GB RAM',
          vCpu: 4,
          ram: 16,
        },
        {
          description: '8 Shared vCpus, 32 GB RAM',
          vCpu: 8,
          ram: 32,
        },
        {
          description: '16 Shared vCpus, 64 GB RAM',
          vCpu: 16,
          ram: 64,
        },
      ],
      storageMin: 20,
      storageMax: 4000,
    };
  },

  enterpriseOptions() {
    return {
      flavor: [
        {
          description: '4 Dedicated vCpus, 16 GB RAM',
          vCpu: 4,
          ram: 16,
        },
        {
          description: '8 Dedicated vCpus, 32 GB RAM',
          vCpu: 8,
          ram: 32,
        },
        {
          description: '16 Dedicated vCpus, 64 GB RAM',
          vCpu: 16,
          ram: 64,
        },
        {
          description: '32 Dedicated vCpus, 128 GB RAM',
          vCpu: 32,
          ram: 128,
        },
        {
          description: '56 Dedicated vCpus, 242 GB RAM',
          vCpu: 56,
          ram: 242,
        },
      ],
      storageMin: 20,
      storageMax: 4000,
    };
  },
};
